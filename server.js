
const express = require('express');
const app = express();
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const socket = require('socket.io');
const io = socket(server);
const port = 5500

class Server {
    constructor(){
        this.users = []
        this.rooms = []
        this.start()
        this.listenForConnections()
    }

    start(){
        server.listen(port, console.log(`server started, and listening to requests on ${port}`))
        
        //serve the static files in the src folder to the browser, these are the files that the users will see
        app.use(express.static('./dist'))


        // app.get('/', function (req, res) {
        //     res.sendFile(__dirname + '/dist/index.html');
        //     res.sendFile(__dirname + '/dist/tailwind.css');
        //     res.sendFile(__dirname + '/dist/main.js');
        // });
    }

    listenForConnections(){
        io.on('connection', function(socket){
            console.log('user connected')
    
            socket.on('create-room', (room) => {
                console.log('room ' + room + ' created')
                this.rooms.push(room)
                console.log('rooms = ' + this.rooms)
            })
            socket.on('create-user', (username) => {
                console.log('user ' + username + ' created')
                this.users.push(username)
                console.log('users = ' + this.users)
                // console.log(this)
            })
        })
    }
}

new Server()