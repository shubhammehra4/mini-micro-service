const express = require("express");
const cors = require("cors");
const axios = require("axios");
const e = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (_req, res) => {
    res.json(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    handleEvent({ type, data });
    res.sendStatus(200);
});

function handleEvent({ type, data }) {
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated") {
        const { id, postId, content, status } = data;
        const post = posts[postId];
        const comment = post.comments.find((c) => c.id === id);
        comment.status = status;
        comment.content = content;
    }
}
app.listen(4002, async () => {
    console.log("Running on 4002");

    const res = await axios.get("http://localhost:4005/events");

    for (let e of res.data) {
        handleEvent({ type: e.type, data: e.data });
    }
});
