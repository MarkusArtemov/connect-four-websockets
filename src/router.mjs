import { MyComponent } from "./component.mjs";

export class Router {

    constructor(container) {
        this.container = container;
        this.routes = new Map();
        this.routes.set(404, new MyComponent("<p>Not Found</p>"));
        this.handlers = new Map();
    }

    register(route, component) {
        this.routes.set(route, component);
    }

    navTo(route) {
        const component = this.routes.get(route) ?? this.routes.get(404);
        component.mount(this.container);

        if (this.handlers.has(route)) {
            const handler = this.handlers.get(route);
            handler();
        }
    }

    on(route, handler) {
        this.handlers.set(route, handler);
    }
}

