import "normalize.css";
import "./app.css";
import { setup, socket, leaveRoom } from "./websocket.mjs";
import { Router } from "./router.mjs";
import { MyComponent } from "./component.mjs";
import { gameTemplate } from "./templates.mjs";
import { chatTemplate } from "./templates.mjs";
import { lobbyTemplate } from "./templates.mjs";
import { homeTemplate } from "./templates.mjs";

const router = new Router(document.getElementById("container"));

router.register(`/`, new MyComponent(homeTemplate, () => {
  socket.disconnect();
}));


router.register(`/lobby`, new MyComponent(`${lobbyTemplate}${chatTemplate}`, () => {
  leaveRoom();
}));

const rooms = ["room1", "room2", "room3", "room4"];

for (const room of rooms) {
  router.register(`/game/${room}`, new MyComponent(`${gameTemplate}${chatTemplate}`, () => {
  }));
}


router.navTo(globalThis.location.pathname);

setup(router);
