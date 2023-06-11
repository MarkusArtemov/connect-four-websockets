export class MyComponent {
    constructor(template, setupFun) {
        this.template = template;
        this.setupFun = setupFun;
    }

    mount(containerElement) {
        const temp = document.createElement("template");
        temp.innerHTML = this.template.trim();
        containerElement.replaceChildren(...temp.content.childNodes);
        if (typeof this.setupFun === "function") this.setupFun();
    }
}
