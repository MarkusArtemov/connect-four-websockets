
export const gameTemplate = `
<a href="/lobby" router-link="/lobby" id="roomLeaveB">Leave Room!</a>
<div class="game">
<div class="game-information">
  <div class="red-chip" draggable="true"></div>
  <p class="game-status">Turn red</p>
  <div class="yellow-chip" draggable="true"></div>
</div>

<div class="game-board">
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>
<div class="game-field"></div>


<section class="popup-container">
<section class="popup">
<p class="winning-message"></p>
<button class="restartButton">Restart</button>
</section>
</section>
</div>
</div>`;


export const lobbyTemplate = `
<h1>Lobby</h1>
<div class="room-container">
  <a href="/game/room1" router-link="/game/room1" class="lobby-link room">Room1</a>
  <a href="/game/room2" router-link="/game/room2" class="lobby-link room">Room2</a>
  <a href="/game/room3" router-link="/game/room3" class="lobby-link room">Room3</a>
  <a href="/game/room4" router-link="/game/room4" class="lobby-link room">Room4</a>
  <a href="/" router-link="/" class="lobby-link lobby-leave">Disconnect</a>
</div>`;




export const chatTemplate = `
<button class="openChatB" id="openChatB"></button>
<div class="chatPopup" id="chat">
  <h1 class="chatHeadline"></h1>
  <div id="chatBox">
  </div>
  <form id="chatForm" class="chatForm">
    <textarea id="chatInput" placeholder="Type message..." name="msg" required></textarea>
    <button id="sendMessageB" type="submit">Send</button>
    <button id="closeChatB" type="button" class="closeChatB">Close</button>
  </form>
</div>`;

export const homeTemplate = `
<div class="home">
<p>Mit WebSocket verbinden?</p>
<a href="/lobby" router-link="/lobby" class="connectWithSocket onclick="connectWithServer()">Verbinden</a>
</div>`


const connectionTemplate = `
<div class="container">
    <div id="connectDiv">
      <button id="socketConnectB">Connect!</button>
      <button id="socketDisconnectB" visibility="hidden">Disconnect!</button>
      <button id="roomJoinB" visibility="hidden">Join Room!</button>
      <button id="roomLeaveB">Leave Room!</button>
    </div>`;


