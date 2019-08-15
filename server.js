const express = require('express')
const app = express()
const server = require('http').Server(app)
const port = 5500
// const socket = require('socket.io')(server)
const io = require('socket.io')

class Server {
    constructor(){
        this.start()
    }

    start(){
        server.listen(port, console.log('server started, and listening to requests on port 5500'))
        
        //serve the static files in the public folder to the browser, these are the files that the users will see
        app.use(express.static('public'))
    }
}

new Server()