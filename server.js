const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = 5500
// const socket = require('socket.io')(server)
const io = require('socket.io')

class Server {
    constructor(){
        this.rooms = []
        this.users = []
        this.start()
    }

    start(){
        server.listen(port, console.log('server started, and listening to requests on port 5500'))
        
        //serve the static files in the src folder to the browser, these are the files that the users will see
        app.use(express.static('./dist'))
    }
}

new Server()