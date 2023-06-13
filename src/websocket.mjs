import { io } from "socket.io-client";
import { setupGame } from "./game.mjs";
import { setupChat } from "./chat.mjs";
import { loadProfilePicture } from "./profile.mjs";

const URL = "http://localhost:3001";
export const socket = io(URL, { autoConnect: false });

let username;
let userList = [];
let currentRoom = "";


export function setup(router) {
  //////////////Events//////////////


  socket.on("connected", ({ ownUserID, ownUsername }) => {
    console.log("connected:" + ownUsername);
    username = ownUsername;
    router.navTo("/lobby");
    loadProfilePicture(username);
  });


  socket.on("join accept", ({ room, roomUsers }) => {
    router.navTo("/game/" + room);
    setupChat(socket, userList, room);
    currentRoom = room;
    loadProfilePicture(username);
    if (roomUsers[0].userID === socket.id) {
      setupGame(socket, "red", room);
    } else {
      setupGame(socket, "yellow", room);
    }
  });

  socket.on("leave accept", ({ room }) => {
    router.navTo("/lobby");
    loadProfilePicture(username);
    setupChat(socket, userList, "public");
    console.log("raus");
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


export function leaveRoom() {
  if (currentRoom != "") {
    socket.emit("leave room", { room: currentRoom });
    currentRoom = "";
    loadProfilePicture(username);
  }
}

