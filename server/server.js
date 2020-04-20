const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 8080;

var { generateMessage } = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIo(server);

//Broadcasting event

io.on('connection' , (socket)=>{
    console.log('New User Connected..');

    socket.emit('newMessage', generateMessage('Admin' ,'welcome to the chat app' ))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage' , (message)=>{
        console.log('create message: ', message);

        io.emit('newMessage' ,generateMessage(message.from,  message.text))

        // socket.broadcast.emit('newMessage' , {
        //     from: message.from ,
        //     text: message.text,
        //     creatAt: new Date().getTime()
        // })

    })

    socket.on('disconnect' , ()=>{
        console.log("user disconnected")
    })
})



app.use(express.static(publicPath))

server.listen(port, ()=>{
    console.log(`server run on port ${port}.`);
})
