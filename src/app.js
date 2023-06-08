import "normalize.css"
import "./app.css"
import { setup, joinRoom, leaveRoom, connectWithServer } from "./websocket.mjs"
import { Router } from "./router.mjs"
import { MyComponent } from "./component.mjs";
import { gameTemplate } from "./templates.mjs";
import { chatTemplate } from "./templates.mjs";
import { lobbyTemplate } from "./templates.mjs";
import { homeTemplate } from "./templates.mjs";

const router = new Router(document.getElementById("container"));

router.register("/", new MyComponent(homeTemplate, null, router));

router.register("/lobby", new MyComponent(`${lobbyTemplate}${chatTemplate}`, null, router));

router.register("/game", new MyComponent(`${gameTemplate}${chatTemplate}`, null, router));

router.on("/", () => {

});

router.on("/lobby", () => {
    connectWithServer();
    leaveRoom("room1")
});

router.on("/game", () => {
    joinRoom("room1");
});

router.navTo(globalThis.location.pathname);

setup();

