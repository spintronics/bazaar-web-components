export function debounce(
  func: (...args: any[]) => any,
  wait?: number,
  immediate?: boolean
) {
  var timeout;
  return function(this: any, ...args: any[]) {
    var later = () => {
      timeout = null;
      if (!immediate) func.call(this, ...args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.call(this, ...args);
  };
}
