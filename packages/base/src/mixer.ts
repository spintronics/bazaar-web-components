/// <reference path="../../globals.d.ts"/>

import { LitElement } from "lit-element";
import { debounce } from "./util";

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
