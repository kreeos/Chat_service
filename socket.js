const username = ["Jack", "Lukas", "James", "Oliver", "Sophia", "Emma", "Aria", "Amelia"]
let accessor = []

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('connected');
        const user = username[Math.floor(Math.random()*username.length)]
        accessor.push(user)

        io.to(socket.id).emit('name', user)
    
        socket.broadcast.emit('enter', user)

        socket.emit('members', accessor)
        socket.broadcast.emit('members', accessor)

        socket.on('disconnect', function(){
            console.log('disconnected')
            let idx = accessor.indexOf(user)
            if (idx > -1) accessor.splice(idx, 1)

            socket.broadcast.emit('members', accessor)
            socket.broadcast.emit('out', user)
        })

        socket.on('chat message', function(message){
            console.log("send")
            socket.broadcast.emit('chat message', user, message)
        })
    });
  };