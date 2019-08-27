const io = require('socket.io-client')

window.onload = function(){

    let socket = io.connect('http://localhost:5500')

    socket.on('connection', function(){
        console.log('connected')
    })

    // let ChatController = (function(){
    // })()
    
    // let CameraController = (function(){
    // })()
    
    // let GameController = (function(){
    //     //p5.canvas stuff...
    // })()

    let RoomController = (function(){
        // let data = {
        //     rooms: []
        //     // rooms: {
        //         // type: [

        //         // ],
        //         //users: []
        //         // 
        //     // }
        // }

        return {
            // createRoom: (room) => {
            //     // socket.on('create', function (room) {
            //         data.rooms.push(room)
            //         socket.join(room)
            //         console.log('user created' + room)
            //         console.log(data)
            //     // });
            // },
            joinRoom: (room) => {
                // data.rooms.push(room)
                socket.join(room)
                console.log('user joined' + room)
            },
            // getRooms: function(){
            //     return {
            //         rooms: data.rooms,
            //     }
            // },
        }
    })()

    let UIController = (function(){
        const DOMStrings = {
            usernameInput: 'username_input', 
            roomInput: 'room_input', 
            inputBtn: '#input_btn',
            rooms: 'avaliable_rooms', 
        }
        return {
            // displayUsers: () => {},
            getInput: () => {
                return {
                    username: document.getElementById(DOMStrings.usernameInput).value,
                    room: document.getElementById(DOMStrings.roomInput).value,
                }
            },
            getDOMStrings: () => DOMStrings
        }
    })()


    let controller = (function(RoomCtrl, UICtrl){
        // console.log(RoomCtrl.getRooms())
        let setupEventListeners = function() {
            const DOM = UICtrl.getDOMStrings()

            document.querySelector(DOM.inputBtn).addEventListener('click', setupRoom)

            console.log(  document.querySelector(DOM.inputBtn))
            document.addEventListener('keypress', function(event) {
                if (event.keyCode === 13 || event.which === 13) {
                    setupRoom()
                }
            })
        }
        let setupRoom = () => {
            
            // 1. Get the field input data
            const {username, room} = UICtrl.getInput()
            // const data = UICtrl.getInput()
            // console.log('data = ' + room, username)

            // 2. if the input data isn't empty /is valid ... (add other error checks/config options)
            if(room !== '' && username !== ''){
                // 3. if the room already exists
                // if(input.room === server.rooms){

                    // let rooms = RoomCtrl.getRooms()
                    // console.log(rooms)
                    // if(rooms.includes(input.room)){
                    //     //server.join(.input.room)
                    //     // RoomCtrl.createRoom

                    //     RoomCtrl.joinRoom(input.room)
                    //     //RoomCtrl.add(room, username?)
                    // }
                // console.log(input)
                // RoomCtrl.joinRoom(input.room)

                //4. else create the new room
                // let data = RoomCtrl.getRooms()
                // // console.log(data.rooms)
                // if(!data.rooms.includes(input.room)){
                //     // RoomCtrl.createRoom(input.room)
                // }

                socket.emit('create-room', room)
                socket.emit('create-user', username)
                // console.log(socket)
            }
        }

        return {
            init: function() {
                console.log('Application has started.')
                setupEventListeners()
            }
        }
    })(RoomController, UIController)

    controller.init()
}
