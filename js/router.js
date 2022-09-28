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

    this.configPage(event.target.pathname);
  }

  handle() {
    //o pathname busca a informação colocada no window.history.pushState() = [URL]
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then(data => data.text())
      //o data foi usado como html abaixo.
      .then(html => {
        document.querySelector('#page').innerHTML = html;
      });
  }

  configPage(event) {
    if (event === '/universe') {
      document.body.classList.remove('explore-page');
      document.body.classList.remove('home');
      document.body.classList.add('universe-page');
    }
    if (event === '/exploration') {
      document.body.classList.remove('universe-page');
      document.body.classList.remove('home');
      document.body.classList.add('explore-page');
    }
    if (event === '/') {
      document.body.classList.add('home');
    }
  }
}
