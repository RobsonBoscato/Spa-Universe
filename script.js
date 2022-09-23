function route(event) {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, '', event.target.href);

  handle();
}

function handle() {
  const { pathname } = document.location;
  console.log(pathname);
  fetch(route).then(data => data.text);
  console.log(data);
}
