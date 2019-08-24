const io = require('socket.io-client')

// const socket = io.connect('http://localhost:5500')

// socket.on('connection', function(){
//     console.log('connected')
// })

// const io = require('socket.io/socket.io')
let socket = io.connect('http://localhost:5500')


document.getElementById('user_input').style.backgroundColor = 'blue'

socket.on('connection', function(){
    console.log('connected')
})
