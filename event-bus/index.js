const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

var events = [];

app.post("/events", (req, res) => {
    const event = req.body;
    events.push(event);

    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);

    res.status(200).json({ status: "ok" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log("Running on 4005");
});
