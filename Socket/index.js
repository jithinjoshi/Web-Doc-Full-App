const io = require('socket.io')(8800,{
    cors:{
        origin:"https://web-doc.jithinjoshi.live"
    }
})

let activeUsers = [];
io.on("connection",(socket)=>{


socket.on('new-user-add',(newUserId)=>{
    if(!activeUsers.some((user)=>user?.userId === newUserId)){
        activeUsers.push({
            userId:newUserId,
            socketId:socket.id
        })

    }

    io.emit('get-users',activeUsers)
});

//send message
socket.on("send-message",(data)=>{
    const {recieverId} = data;
    const user = activeUsers.find((user)=> user.userId === recieverId);

    if(user){
        io.emit("recieve-message",data);
        
    }

})



socket.on("disconnect",()=>{
    activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id);
    io.emit('get-users',activeUsers)
})

})

