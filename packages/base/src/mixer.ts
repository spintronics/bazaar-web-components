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
      connectedCallback(this: IntersectionWatcher) {
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
      firstUpdated(this: LitElement & IntersectionWatcher) {
        for (let target of targets) {
          this.intersectionObserver.observe(
            (target && this.renderRoot.querySelector(target)) || this
          );
        }
      }
      disconnectedCallback(this: LitElement & IntersectionWatcher) {
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
