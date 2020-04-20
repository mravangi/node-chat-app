var socket = io();

socket.on('connect' , function(){
    console.log('connected to server');
})
socket.on('disconnect' , function(){
    console.log("user Disconnect from server")
})

socket.on('newMessage' , function(message){
    var formatTime = moment(message.createAt).format('YYYY/MM/DD hh:mm a');

    var templete = jQuery('#message-template').html();
    var html = Mustache.render(templete , {
        text: message.text,
        from: message.from,
        createAt: formatTime
    })
     jQuery('#messages').append(html);
})

jQuery("#message-form").on('submit' , function(e){
    e.preventDefault();
    var message = jQuery('[name=message]');
    socket.emit('createMessage' , {
        from: 'User',
        text: message.val()
    },function(){
        message.val('');
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled' , 'disabled').text('Sending Location..');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location')
    })
})

socket.on('newLocationMessage', function(message){
    var formatTime = moment(message.createAt).format('YYYY/MM/DD hh:mm a');
    var templete = jQuery('#location-message-template').html();
    var html = Mustache.render(templete , {
        url: message.url,
        from: message.from,
        createAt: formatTime
    })

    jQuery('#messages').append(html);
})

