
const express = require('express');
const app = express();
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const socket = require('socket.io');
const io = socket(server);
const port = 5500

// class Server {
//     constructor(){
//         this.users = []
//         this.rooms = []
//         this.start()
//         this.listenForConnections()
//     }

//     start(){
//         server.listen(port, console.log(`server started, and listening to requests on ${port}`))
        
//         //serve the static files in the src folder to the browser, these are the files that the users will see
//         app.use(express.static('./dist'))


//         // app.get('/', function (req, res) {
//         //     res.sendFile(__dirname + '/dist/index.html');
//         //     res.sendFile(__dirname + '/dist/tailwind.css');
//         //     res.sendFile(__dirname + '/dist/main.js');
//         // });
//     }

//     listenForConnections(){
//         io.on('connection', function(socket){
//             console.log('user connected')
    
//             socket.on('create-room', (room) => {
//                 console.log('room ' + room + ' created')
//                 this.rooms.push(room)
//                 console.log('rooms = ' + this.rooms)
//             })
//             socket.on('create-user', (username) => {
//                 console.log('user ' + username + ' created')
//                 this.users.push(username)
//                 console.log('users = ' + this.users)
//                 // console.log(this)
//             })
//         })
//     }
// }

// new Server()


// let RoomController = (function(){
//     // let data = {
//     //     rooms: []
//     //     // rooms: {
//     //         // type: [

//     //         // ],
//     //         //users: []
//     //         // 
//     //     // }
//     // }
//     let rooms = {
//         names: {}
//     }
// })()

// let UserController = (function(){

// })()

//add ejs (and get the app to render/disaply dynamic content) - and get rooms + routes to work


//create rooms/room components (chat, cameras, game, etc...) on the client end and store them in the back end?
let Server = (function(){
        let data = {
            rooms: [
                //users
                //elements? {
                    //chat:{},
                    // cameras:{},
                    // game:{}
                //}
                {room1:{}},   
            ],
            users: [
                //pretty sure we can handle users connecting/disconnecting to rooms without needing to store them in 'data.rooms'
            ]
        }

        // let User = function(username){
        //     this.username = username
        // }
        
        // let Options = function(options = {}){
        //     const {camera = true, chat = true, gameType = 'draw'} = options

        //     this.options = {
        //         camera,
        //         chat,
        //         gameType
        //     }
        // }

        // let Room = function(name, users = {}, options = {} ){
        //     const {camera = true, chat = true, gameType = 'draw'} = options
            
        //     this.name = name
        //     this.options = {
        //         camera,
        //         chat,
        //         gameType
        //     }    
        //     this.users = users
            
        // }

        // let tim = new User('tim')
        // let jim = new User('jim')
        // let room999 = new Room(
        //     'room999',
        //     {tim, jim}
        // )
        // console.log('room999 = ', room999)
        // console.log('newRoom = ', new Room('newRoom', {}, {camera: false, gameType: 'tetris'}))
        // let rooms = {
        //     room1: {users: {}, options:{}}
        // }

    let start = function(){
        server.listen(port, console.log(`server started, and listening to requests on ${port}`))

        app.set('views', './src/views')
        app.set('view engine', 'ejs')
        app.use(express.static('./dist'))
        //accept URL params
        app.use(express.urlencoded({extended: true}))
            
        app.get('/', (req, res) => {
            // res.render('index', {data: rooms})
            res.render('index', {rooms : data.rooms})
        })
    
        //dynamic room route
        app.get('/:room', (req, res) => {
            res.render('room', {roomName: req.params.room})
        })
    }

    let listenForConnections = function(){
        io.on('connection', function(socket){
            console.log('user connected')
    
            socket.on('create-room', (room) => {
                console.log('room ' + room + ' created')
                data.rooms.push(room)
                console.log('rooms = ' + data.rooms)

                // socket.broadcast.emit
            })
            socket.on('create-user', (username) => {
                console.log('user ' + username + ' created')
                data.users.push(username)
                console.log('users = ' + data.users)
                // console.log(this)
            })
            socket.on('join-room', (room, username) => {
                socket.join(room)
                socket.to(room).broadcast.emit('user-connected', username)
            })
        })
    }
    return {
        init: function(){
            start()
            listenForConnections()
        }
    }
})()

Server.init()