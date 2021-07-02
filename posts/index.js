const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

var posts = {};

app.get("/posts", (_req, res) => {
    res.json(posts);
});
app.post("/posts", async (req, res) => {
    const id = randomBytes(8).toString("hex");
    const { title } = req.body;

    posts[id] = { id, title };

    await axios.post("http://localhost:4005/events", {
        type: "PostCreated",
        data: { id, title },
    });

    res.status(201).json(posts[id]);
});

app.post("/events", (_req, res) => {
    res.sendStatus(200);
});

app.listen(4000, () => {
    console.log("Running on 4000");
});
