import { Subject, Observable } from "rxjs";
import { multicast, refCount } from "rxjs/operators";

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

interface Intent {
  type: string;
  data: any;
  event?: Event;
}

export function broadcast({ type, data }: Intent, immediate = false) {
  function go(event) {
    window.dispatchEvent(
      new CustomEvent("intent", {
        detail: {
          type,
          data,
          event
        }
      })
    );
  }
  if (immediate) return go({});
  return go;
}

export const intent$ = Observable.create(function(observer) {
  let intentListener = event => {
    observer.next(event.detail);
  };
  window.addEventListener("intent", intentListener.bind(observer));
  return () => {
    window.removeEventListener("intent", intentListener);
  };
}).pipe(
  multicast(new Subject()),
  refCount()
) as Observable<Intent>;
