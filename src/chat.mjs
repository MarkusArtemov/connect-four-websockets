export function setupChat(socket, currentUList, room) {
    const chat = document.getElementById("chat");
    const closeChatB = document.getElementById("closeChatB");
    const openChatB = document.getElementById("openChatB")
    const sendMessageB = document.getElementById("sendMessageB");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatBox = document.getElementById("chatBox");
    let userList = currentUList;



    closeChatB.addEventListener("click", () => {
        chat.style.display = "none";
    });

    openChatB.addEventListener("click", () => {
        chat.style.display = "block";
    });



    //check what type of chat and implement functionality accordingly
    if (room === "public") {
        chatForm.onsubmit = (event) => {
            event.preventDefault();
            const text = chatInput.value;
            socket.emit("public message", { content: text })
        };

        socket.on("public message", ({ content, from }) => {
            const p = document.createElement("p");
            p.textContent = `${getUsernameFromID(from)}: ${content}`;
            chatBox.appendChild(p);
            chatBox.scroll({ top: chat.scrollHeight, behavior: "smooth" });
            chatInput.value = "";
        });
    } else {

        chatForm.onsubmit = (event) => {
            event.preventDefault();
            const text = chatInput.value;
            socket.emit("room message", { content: text, room: "room1" })
        };

        socket.on("room message", ({ content, from }) => {
            const p = document.createElement("p");
            p.textContent = `${getUsernameFromID(from)}: ${content}`;
            chatBox.appendChild(p);
            chatBox.scroll({ top: chat.scrollHeight, behavior: "smooth" });
            chatInput.value = "";
        });
    }





    socket.on("user connected", (user) => {
        userList.push(user);
        //console.log("User connected: " + user.username);
    });


    // function to get username for user id
    function getUsernameFromID(id) {
        for (const { userID, username } of userList) {
            if (userID === id) return username;
        }
        return "anonymous";
    }
}