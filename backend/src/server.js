const http = require("http")
const { Server } = require("socket.io")
const app = require("./app")
const setupsocket = require("./socket")
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: "*"
    }
})

setupsocket(io)
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log("server started")
})
