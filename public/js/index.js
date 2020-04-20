var socket = io();

socket.on('connect' , function(){
    console.log('connected to server');
    // socket.emit('createMessage', {
    //     from: 'username',
    //     text: 'hey, this is makhco'
    // })
})
socket.on('disconnect' , function(){
    console.log("user Disconnect from server")
})

socket.on('newMessage' , function(message){
    console.log('new message: ' ,message)

    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
})

jQuery("#message-form").on('submit' , function(e){
    e.preventDefault();
    console.log( jQuery('[name-message]').val())
    socket.emit('createMessage' , {
        from: 'User',
        text: jQuery('[name=message]').val()
    })
})