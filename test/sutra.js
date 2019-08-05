export function nextAnimationFrame() {
  return new Promise(resolve => {
    window.requestAnimationFrame(resolve);
  });
}

export function theGoodStuff(promise) {
  return promise.then(a => [null, a]).catch(e => [a, null]);
}

export function log(...args) {
  console.log(...args);
  return args[0];
}
