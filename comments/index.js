const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

var commetsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.json(commetsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
    const { id } = req.params;
    const commentId = randomBytes(8).toString("hex");
    const { content } = req.body;
    const comments = commetsByPostId[id] || [];

    comments.push({ id: commentId, content, status: "pending" });
    commetsByPostId[id] = comments;

    await axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: { id: commentId, content, postId: id, status: "pending" },
    });

    res.status(201).json(commetsByPostId[id]);
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { id, content, postId, status } = data;
        const comments = commetsByPostId[postId];

        const comment = comments.find((c) => c.id === id);
        comment.status = status;

        await axios.post("http://localhost:4005/events", {
            type: "CommentUpdated",
            data: { id, content, postId, status },
        });
    }
    res.sendStatus(200);
});

app.listen(4001, () => {
    console.log("Running on 4001");
});
