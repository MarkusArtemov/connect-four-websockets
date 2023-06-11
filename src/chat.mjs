export function setupChat(socket, currentUList, room) {
    const chat = document.getElementById("chat");
    const chatHeadline = document.querySelector(".chatHeadline")
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
        openChatB.innerHTML = "Lobby-Chat";
        chatHeadline.innerHTML = "Lobby-Chat";
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
        openChatB.innerHTML = "Ingame-Chat";
        chatHeadline.innerHTML = "Ingame-Chat";
        chatForm.onsubmit = (event) => {
            event.preventDefault();
            const text = chatInput.value;
            socket.emit("room message", { content: text, room: room })
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
    });


    // function to get username for user id
    function getUsernameFromID(id) {
        for (const { userID, username } of userList) {
            if (userID === id) return username;
        }
        return "anonymous";
    }
}