import { io } from "socket.io-client";
import { setupGame } from "./game.mjs";
import { setupChat } from "./chat.mjs";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });

let username;
let userList = [];
let currentRoom = "";

export function setup() {

    //////////////Events//////////////
    socket.on("connect", () => {

    });


    socket.on("join accept", ({ room, roomUsers }) => {
        setupChat(socket, userList, room);
        if (roomUsers[0].userID === socket.id) {
            setupGame(socket, "red", room);
        } else {
            setupGame(socket, "yellow", room);
        }
    });

    socket.on("leave accept", () => {
        setupChat(socket, userList, "public");
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
    });

    socket.on("user joined", (user) => {
        if (user.userID == socket.id) {
            console.log("You joined a room");
        } else {
            console.log("user joined the room: " + user.username);
        }
    })

    //////////////End Events//////////////

}


export function joinRoom(roomName) {
    socket.emit("join room", { room: roomName });
    currentRoom = roomName;
}

export function leaveRoom() {
    if (currentRoom != "") {
        socket.emit("leave room", { room: currentRoom });
        currentRoom = "";
    }
}

export function connectWithServer() {
    if (socket.connected) {
        console.log('Already connected');
        return;
    }
    username = prompt("Please enter Username", "kalle");
    socket.auth = { username };
    socket.connect();
    console.log("Connecting...");
}

export function disconnect() {
    socket.disconnect();
}