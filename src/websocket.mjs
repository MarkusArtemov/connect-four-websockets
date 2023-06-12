import { io } from "socket.io-client";
import { setupGame } from "./game.mjs";
import { setupChat } from "./chat.mjs";
import { loadProfilePicture } from "./profile.mjs";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });

let username;
let userList = [];
let currentRoom = "";


export function setup() {
  //////////////Events//////////////

  // For debug purpose only
  socket.onAny((event, arg1, ...args) => {
    console.log(event, JSON.stringify(arg1), JSON.stringify(args));
  });

  socket.on("connect", () => {});

  socket.on("join accept", ({ room, roomUsers }) => {
    setupChat(socket, userList, room);
    if (roomUsers[0].userID === socket.id) {
      setupGame(socket, "red", room);
    } else {
      setupGame(socket, "yellow", room);
    }
  });

  socket.on("leave accept", ({ room }) => {
    setupChat(socket, userList, "public");
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected: " + reason);
  });

  // error callback for connection errors
  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      console.log("no username provided!");
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
    console.log("User connected: " + user.username);
  });

  socket.on("user joined", (user) => {
    console.log("user joined the room: " + user.username);
  });

  //////////////End Events//////////////
}

export function joinRoom(roomName) {
  socket.emit("join room", { room: roomName });

  currentRoom = roomName;
  loadProfilePicture(username);
}

export function leaveRoom() {
  if (currentRoom != "") {
    socket.emit("leave room", { room: currentRoom });
    currentRoom = "";
    loadProfilePicture(username);
  }
}

export function connectWithServer() {
  if (socket.connected) {
    console.log("Already connected");
    return;
  }
  username = prompt("Please enter Username", "kalle");
  socket.auth = { username };
  socket.connect();
  console.log("Connecting...");
  loadProfilePicture(username);
}

export function disconnect() {
  socket.disconnect();
}
