/// <reference path="../../globals.d.ts"/>

import { LitElement } from "lit-element";
import { debounce } from "./util";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import {
  type,
  mapObjIndexed,
  path,
  pathOr,
  prop,
  mergeDeepRight
} from "ramda/es";

export const evolve = obj => (state, action) => {
  function step(ref, depth: string[]) {
    switch (type(ref)) {
      //prop: 'data.value'
      //prop = action.data.value
      case "String":
        return prop(ref, action);
      //prop: [null, 'data.value']
      //prop = action.data.value || null
      case "Array":
        return pathOr(ref[0], ref[1], action);
      //prop: (referenceValue, action, state) => value
      //backwards from (state, action) because value contains the scoped state
      //and so is less likely to be useful
      case "Function":
        return ref(path(depth, state), action, state);
      default:
        return mapObjIndexed(
          (value, key) => step(value, depth.concat([key])),
          ref
        );
    }
  }

  return mergeDeepRight(state, step(obj, []));
};

interface Intent {
  type: string;
  data: any;
  source?: symbol | string;
}

interface WithConnectionOptions {
  state$?: Observable<{ [key: string]: any }>;
  intent$?: Observable<Intent>;
  mapStateToProps?: (state, action) => { [key: string]: any };
}

// let state$ = Observable.from(store)
// let intent$ = fromEvent(window, 'intent')
// class connectedElement extends withConnection({
//   intent$: intent$.pipe(filter(propEq('type', 'add_to_cart'))),
//   state$: state$.map(prop('cart')),
//   mapStateToProps: evolve({

//   })
// })(LitElement) {
//   constructor() {}
// }

export const withConnection = (options: WithConnectionOptions) => {
  return <T extends Constructor<CustomElement & HTMLElement>>(
    baseElement: T
  ) => {
    return class extends baseElement {
      state = {};
      constructor(...args) {
        super(...args);
      }
      stateChanged(newState) {
        this.state = newState;
        ((this as unknown) as LitElement).requestUpdate();
      }
      dataObserver: Subscription | undefined;
      intentObserver: Subscription | undefined;
      connectedCallback() {
        if (super.connectedCallback) super.connectedCallback();
        if (options.intent$) {
          this.intentObserver = options.intent$.subscribe({
            next: intent => {
              this.dispatchEvent(
                new CustomEvent(`intent:${intent.type}`, { detail: intent })
              );
            },
            error: error => {
              this.dispatchEvent(
                new CustomEvent("intent:error", { detail: error })
              );
            },
            complete: this.cleanup
          });
        }
        if (options.state$) {
          this.dataObserver = options.state$
            .pipe(map(evolve(options.mapStateToProps)))
            .subscribe({
              next: this.stateChanged.bind(this),
              error: error => {
                this.dispatchEvent(
                  new CustomEvent("data:error", { detail: error })
                );
              },
              complete: this.cleanup
            });
        }
      }
      cleanup() {
        if (this.dataObserver) this.dataObserver.unsubscribe();
        if (this.intentObserver) this.intentObserver.unsubscribe();
      }
      disconnectedCallback() {
        if (super.disconnectedCallback) super.disconnectedCallback();
        this.cleanup();
      }
    };
  };
};

export function withIntersectionObserver({
  root = null,
  targets = [null],
  rootMargin = "0px",
  threshold = 0,
  delay = 0
}: IntersectionObserverOptions = {}) {
  return <T extends Constructor<CustomElement>>(baseElement: T) => {
    return class extends baseElement {
      intersectionObserver;
      connectedCallback(this: IIntersectionObserver) {
        if (super.connectedCallback) super.connectedCallback();
        const observer = (
          entries: IntersectionObserverEntry[],
          observer: IntersectionObserver
        ) => {
          if (this.intersectionCallback) {
            this.intersectionCallback(entries, observer);
          }
        };
        this.intersectionObserver = new IntersectionObserver(
          delay ? debounce(observer, delay) : observer,
          {
            root: root ? document.querySelector(root) : null,
            rootMargin,
            threshold
          }
        );
      }
      firstUpdated(this: LitElement & IIntersectionObserver) {
        for (let target of targets) {
          this.intersectionObserver.observe(
            (target && this.renderRoot.querySelector(target)) || this
          );
        }
      }
      disconnectedCallback(this: LitElement & IIntersectionObserver) {
        if (super.disconnectedCallback) super.disconnectedCallback();
        for (let target of targets) {
          this.intersectionObserver.unobserve(
            (target && this.renderRoot.querySelector(target)) || this
          );
        }
      }
    };
  };
}

// interface MediaQueryOptions

// export function withMediaQuery(...queries) {
//   return <T extends Constructor<CustomElement>>(base: T) => {
//     return class extends base {
//       resizeObserver = () => {};
//       connectedCallback() {
//         if (super.connectedCallback) super.connectedCallback();
//       }
//     };
//   };
// }
