const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 8080;
var app = express();
var server = http.createServer(app);
var io = socketIo(server);

io.on('connection' , (socket)=>{
    console.log('New User Connected..');
    socket.on('disconnect' , ()=>{
        console.log("user desconnected")
    })
})



app.use(express.static(publicPath))

server.listen(port, ()=>{
    console.log(`server run on port ${port}.`);
})
