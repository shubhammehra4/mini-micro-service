const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentCreated") {
        const status = data.content.includes("orange")
            ? "rejected"
            : "approved";
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                ...data,
                status,
            },
        });
    }

    res.sendStatus(200);
});

app.listen(4003, () => {
    console.log("Running on 4003");
});
