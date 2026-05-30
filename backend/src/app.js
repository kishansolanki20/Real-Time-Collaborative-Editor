// const http = require("http")
const express = require("express")
const app = express()
const path = require('path');
// const server = http.createServer(app)
// const { Server } = require("socket.io")
// const io = new Server(server)

app.use(express.static("build"))
// app.get("/", (req,res) => {
//     return res.sendFile("/public/index.html")
// })
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
module.exports = app

