import { io } from "socket.io-client";
import { setupGame } from "./game.mjs";
import { setupChat } from "./chat.mjs";

    const URL = "http://localhost:3001";
    const socket = io(URL, { autoConnect: false });

    let username; 
    let userList = [];

export function setup() {
    // connection setting. do not autoconnect, we need to set username first

    // function to get username for user id
    function getUsernameFromID(id) {
        for (const { userID, username } of userList) {
            if (userID === id) return username;
        }
        return "anonymous";
    }



    /*
      we can join a room - there are 4 rooms available
      room1, room2, room3 and room4
      these are for playing a round of connect four
      thus only 2 users can join
      if we can join, the server will send a join accept event
      when we can not join the server will send join reject
    */
   //socket.emit("join room", { room: "room1" }); //TO-DO: add lobby screen, add connect overlay for lobby. add room-option for lobby!



    //////////////Events//////////////

    // For debug purpose only
    socket.onAny((event, arg1, ...args) => {
        console.log(event, JSON.stringify(arg1), JSON.stringify(args));
    });

    socket.on("connect", () => {
        console.log("läuft doch");
        
        });


    socket.on("join accept", ({room, roomUsers}) => {
        setupChat(socket, userList, room);
        if(roomUsers[0].userID === socket.id){
            setupGame(socket, "red");
        }else{
            setupGame(socket, "yellow");
        }
    });

    socket.on("leave accept", () => {
    });

    socket.on("disconnect", (reason) => {
        console.log('Disconnected: ' + reason);
    });

    // error callback for connection errors
    socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
            console.log("no username provided!")
        }
        console.log("Connection error: " + err);
    });

    /*
      after connection we will get an array with known users
      each entry is an object with two properties: userID and username
    */
    socket.on("users", (users) => {
        userList = users;
        setupChat(socket, userList, "public");
    });


    /* 
      when new users connect after us, we will be informed and can push the
      user object to our list of known users
    */
    socket.on("user connected", (user) => {
        userList.push(user);
        //console.log("User connected: " + user.username);
    });

    socket.on("user joined", (user) => {
        if(user.userID == socket.id){
            console.log("You joined a room");
        }else{
            console.log("user joined the room: " + user.username);
        }
        //console.log("user jouined room: " + user.username);
    })

    //////////////End Events//////////////
    
}


export function joinRoom(roomName) {
        socket.emit("join room", { room: roomName })
  }

export function leaveRoom(roomName) {
        socket.emit("leave room", { room: roomName });
  }

  export function connectWithServer(){
    if (socket.connected) {
        console.log('Already connected');
        return;
    }
    username = prompt("Please enter Username", "kalle");
    socket.auth = { username };
    socket.connect();
    console.log("Connecting...");
}