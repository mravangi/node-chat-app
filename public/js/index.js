var socket = io();

socket.on('connect' , function(){
    console.log('connected to server');
    socket.emit('createMessage', {
        from: 'username',
        text: 'hey, this is makhco'
    })
})
socket.on('disconnect' , function(){
    console.log("user Disconnect from server")
})

socket.on('newMessage' , function(message){
    console.log('new message: ' ,message)
})