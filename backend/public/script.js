const socket = io()

const editor = document.getElementById("editor")
const roomInput = document.getElementById("roomInput");
const joinBtn = document.getElementById("joinBtn");
let roomId=null

joinBtn.addEventListener("click", ()=> {
    roomId=roomInput.value
    if(!roomId) return
    socket.emit("join-room",roomId)
    console.log("user joined",roomId)    
})


editor.addEventListener("input", (e) => {
    if(!roomId) return
    socket.emit("output",{
        roomId: roomId,
        text : editor.value
    })
})
socket.on("output", (text) => {
    editor.value=text
})