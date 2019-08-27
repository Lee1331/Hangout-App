// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// const port = 5500
// // const socket = require('socket.io')(server)
// const io = require('socket.io')

// const app = require('express')()
// const server = require('http').Server(app)
// const port = 5500

// const express = require('express');
// const app = express();
// const server = require('http').Server(app);

// const io = require('socket.io')(server)

// const socket = require('socket.io')(server)
// let io = socket(server);









// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// const socket = require('socket.io');
// const port = 5500


const express = require('express');
const app = express();
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const socket = require('socket.io');
const io = socket(server);

const port = 5500


class Server {
    constructor(){
        this.rooms = []
        this.users = []
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
    
            socket.on('create', (room) => {
                this.rooms.push(room)
                console.log('rooms = ' + this.rooms)
            })
        })
    }

    // createUser(){}
    // createRoom(){}
}

new Server()