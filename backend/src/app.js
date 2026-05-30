// const http = require("http")
const express = require("express")
const app = express()
const path = require('path');
// const server = http.createServer(app)
// const { Server } = require("socket.io")
// const io = new Server(server)

app.get("/", (req, res) => {
    res.send("Backend is running");
});
module.exports = app

