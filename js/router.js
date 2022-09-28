export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
    // devido ao preventDefault, preciso fazer manualmente as mudanças de rota;

    window.history.pushState({}, '', event.target.href);

    this.handle();
  }

  handle() {
    //o pathname busca a informação colocada no window.history.pushState() = [URL]
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#page').innerHTML = html;
      });
  }
}
