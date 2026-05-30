const ACTIONS = require('../../frontend/src/Actions')

const userSocketMap = {}
function getAllConnectedClients(io,roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=> {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    })
}

function setupsocket(io) {
    io.on("connection",(socket)=> {
        console.log('user connected')
        // socket.on("output",(message)=> {
        //     io.emit("output",message)
        // })
        socket.on(ACTIONS.JOIN, ({roomId,username}) => {
            userSocketMap[socket.id] = username
            socket.join(roomId)
            console.log(`${socket.id} joined room`)
            const clients = getAllConnectedClients(io,roomId)
            clients.forEach(({socketId})=> {
                io.to(socketId).emit(ACTIONS.JOINED,{
                    clients,
                    username,
                    socketId:socket.id,
                })
            })
        })
        socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
            socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
        });

        socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
            io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
        });


        // disconnecting
        socket.on('disconnecting',()=> {
            const rooms = [...socket.rooms]
            rooms.forEach((roomId)=> {
                socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: userSocketMap[socket.id],
                })
            })
            delete userSocketMap[socket.id]
            socket.leave()
        })
    })
}
module.exports = setupsocket