import { MyComponent } from "./component.mjs";
import { socket } from "./websocket.mjs";

export class Router {

    constructor(container) {
        this.container = container;
        this.routes = new Map();
        this.routes.set(404, new MyComponent("<p>Not Found</p>"));

        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.path) {
                this.navTo(event.state.path);
            }
        });
    }

    register(route, component) {
        this.routes.set(route, component);
    }

    navTo(route) {
        const component = this.routes.get(route) ?? this.routes.get(404);

        if (!window.history.state || window.history.state.path !== route) {
            window.history.pushState({ path: route }, '', route);
        }

        component.mount(this.container);
        this.setupRouter();
    }

    setupRouter() {
        const routerLinks = document.querySelectorAll("[router-link]");
        for (const link of routerLinks) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const route = link.getAttribute("router-link");

                if (route.startsWith("/game/")) {
                    const room = route.substring(route.length - 5);
                    socket.emit("join room", { room });
                } else if (route.startsWith("/lobby")) {
                    const username = prompt("Please enter Username", "kalle");
                    socket.auth = { username };
                    socket.connect();
                } else {
                    this.navTo(route);
                }

            });
        }
    }


}
