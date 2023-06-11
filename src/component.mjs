export class MyComponent {
    constructor(template, setupFun, router) {
        this.template = template;
        this.setupFun = setupFun;
        this.router = router;
    }

    mount(containerElement) {
        const temp = document.createElement("template");
        temp.innerHTML = this.template.trim();
        containerElement.replaceChildren(...temp.content.childNodes);
        this.setupRouter();
        if (typeof this.setupFun === "function") this.setupFun();
    }

    setupRouter() {
        const routerLinks = document.querySelectorAll("[router-link]");
        for (const link of routerLinks) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const route = link.getAttribute("router-link");
                this.router.navTo(route);
                globalThis.history.pushState("", "", route);
            });
        }
    }
}
