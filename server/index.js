const express = require('express');
//used ot build server with socket
const app = express()
const http = require("http");
const cors = require("cors");
//creates the server with socket.io
const {Server} = require("socket.io")
app.use(cors());


const server = http.createServer(app);
//
const io = new Server(server, {
    cors:{
        //which url is calling/called
        origin: "http://localhost:3000",
        methods:["GET","POST"],
    },
});
//server generation

//checks if someone is connected to the server
io.on("connection",(socket)=>{
    //logs socketid
    console.log(`User connected:${socket.id}`);

    //joins the room to data
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    //send message log
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    });

    //disconnect
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
    });
});

server.listen(3001, ()=>{
    console.log("SERVER RUNNING");
});