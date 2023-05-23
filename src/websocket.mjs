import { io } from "socket.io-client";

export function setup() {
    // connection setting. do not autoconnect, we need to set username first
    const URL = "http://localhost:3001";
    const socket = io(URL, { autoConnect: false });

    const username = prompt("Please enter Username", "niklas");
    let userList = [];


    // function to get username for user id
    function getUsernameFromID(id) {
        for (const { userID, username } of userList) {
            if (userID === id) return username;
        }
        return "anonymous";
    }

    // provide username, then connect
    socket.auth = { username };
    socket.connect();

    // For debug purpose only
    socket.onAny((event, arg1, ...args) => {
        console.log(event, JSON.stringify(arg1), JSON.stringify(args));
    });

    // error callback for connection errors
    socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
            console.log("no username provided!")
        }
    });

    /*
      after connection we will get an array with known users
      each entry is an object with two properties: userID and username
    */
    socket.on("users", (users) => {
        userList = users;
    });


    /* 
      when new users connect after us, we will be informed and can push the
      user object to our list of known users
    */
    socket.on("user connected", (user) => {
        userList.push(user);
    });

    /*
      we can join a room - there are 4 rooms available
      room1, room2, room3 and room4
      these are for playing a round of connect four
      thus only 2 users can join
      if we can join, the server will send a join accept event
      when we can not join the server will send join reject
    */
    socket.emit("join room", { room: "room1" });

    /*
      After we have joined a room, we can send a game message to a room.
      To define the content is up to us.
      We can listen to game messages - we will also receive our own messages
      - so we need to either ignore them or use them a trigger to update game and UI state.
    */
    socket.emit("game message", { content: "Test", to: "room1" })

    // we can leave a room
    socket.emit("leave room", { room: "room1" });

    /// -------------------------------------------------------------------------------------------------------
    // From here on an example for using public messages (forwarded to all users, including ourselves) follows:

    const chatForm = document.querySelector("#chat-form");
    const chatInput = document.querySelector("#chat-input");
    const chat = document.querySelector("#chat");

    chatInput.focus();

    chatForm.onsubmit = (event) => {
        event.preventDefault();
        const text = chatInput.value;
        socket.emit("public message", { content: text })
    };

    // This is an example on how to react messages like "public message", "private message" or "game message"
    socket.on("public message", ({ content, from }) => {
        const p = document.createElement("p");
        p.textContent = `${getUsernameFromID(from)}: ${content}`;
        chat.appendChild(p);
        chat.scroll({ top: chat.scrollHeight, behavior: "smooth" });
        chatInput.value = "";
    })

    console.log("Websocket Server listening on ws://127.0.0.1:3001")
}