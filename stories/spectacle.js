//helpers
export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function injectExternalScript(src) {
  // if (document.querySelector(`script[src="${src}"]`)) return;
  var el = document.createElement("script");
  el.src = src;
  document.head.appendChild(el);
}

export function injectStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  var el = document.createElement("link");
  el.rel = "stylesheet";
  el.href = href;
  document.head.appendChild(el);
}

export function randomString() {
  return Math.random()
    .toString(36)
    .substring(7);
}
