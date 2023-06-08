export class MyComponent {
  constructor(template, setupFun, router) {
      this.template = template;
      this.setupFun = setupFun;
      this.router = router; // Passing router to the component
  }

  mount(containerElement) {
      const temp = document.createElement("template");
      temp.innerHTML = this.template.trim();
      containerElement.replaceChildren(...temp.content.childNodes);
      this.setupRouter(); // Call setupRouter here after new content is added to the DOM
      if (typeof this.setupFun === "function") this.setupFun();
  }

  setupRouter() { // This method will now be inside MyComponent
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
