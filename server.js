
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
            ],
            users: [
                //pretty sure we can handle users connecting/disconnecting to rooms without needing to store them in 'data.rooms'
            ]
        }

        let start = function(){
        server.listen(port, console.log(`server started, and listening to requests on ${port}`))
        //serve the static files in the src folder to the browser, these are the files that the users will see
        app.use(express.static('./dist'))
    }

    let listenForConnections = function(){
        io.on('connection', function(socket){
            console.log('user connected')
    
            socket.on('create-room', (room) => {
                console.log('room ' + room + ' created')
                data.rooms.push(room)
                console.log('rooms = ' + data.rooms)
            })
            socket.on('create-user', (username) => {
                console.log('user ' + username + ' created')
                data.users.push(username)
                console.log('users = ' + data.users)
                // console.log(this)
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