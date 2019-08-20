import { Layout } from "./base";
import { property, html, customElement } from "lit-element";
import {
  fromEvent,
  Subject,
  Subscription,
  Observable,
  animationFrameScheduler
} from "rxjs";
import {
  // debounceTime,
  multicast,
  refCount,
  map,
  filter,
  // debounce,
  observeOn
} from "rxjs/operators";
// import { styleMap } from "lit-html/directives/style-map";

export type breakpoint =
  | "fullhd"
  | "widescreen"
  | "desktop"
  | "tablet"
  | "mobile";

export const defaultBreakpoints = {
  fullhd: "1408px",
  widescreen: "1216px",
  desktop: "1024px",
  tablet: "769px",
  mobile: "0px"
};

const breakpoints = Object.keys(defaultBreakpoints);

interface MediaMatcher {
  key: string;
  matches: boolean;
  origin?: symbol;
}

const mediaSubjectPool: {
  [key: string]: Observable<MediaMatcher>;
} = {};

interface ResizeEvent extends Event {
  computedBreakpoints: { [key in breakpoint]: string };
  origin?: symbol;
}

export function ResizeObservable() {
  return fromEvent(window, "resize") as Observable<ResizeEvent>;
}

export const resizeObserver = ResizeObservable().pipe(
  observeOn(animationFrameScheduler),
  map(event => {
    /**
     * getting the computed breakpoint variables is somewhat expensive but variables
     * don't work (e.g. matchMedia('var(--desktop)')) so it's necessary. this could
     * be more efficient with the onchange event of MediaQueryList but it is not supported
     * by safari yet.
     */
    const computed = getComputedStyle(document.body);
    event.computedBreakpoints = breakpoints.reduce((acc, key) => {
      acc[key] = computed.getPropertyValue("--" + key) || acc[key];
      return acc;
    }, defaultBreakpoints);
    return event;
  })
);

/**
 * resizeEvent > debounce > getComputedBreakpoints > breakpoint / queries observe change
 */

for (let key of breakpoints) {
  mediaSubjectPool[key] = resizeObserver.pipe(
    map(event => {
      return {
        key,
        matches: window.matchMedia(
          `(min-width: ${event.computedBreakpoints[key]})`
        ).matches,
        origin: event.origin
      };
    }),
    multicast(new Subject()),
    refCount()
  );
}

@customElement("neo-media")
export class Media extends Layout {
  @property({ type: String }) query = "";
  @property({ type: Boolean, reflect: true }) mobile = false;
  @property({ type: Boolean, reflect: true }) tablet = false;
  @property({ type: Boolean, reflect: true }) desktop = false;
  @property({ type: Boolean, reflect: true }) widescreen = false;
  @property({ type: Boolean, reflect: true }) fullhd = false;
  @property({ type: Boolean, reflect: true }) matches;
  @property({ type: Boolean, reflect: true }) autoHide = false;
  protected subscriptions: { [key: string]: Subscription } = {};
  protected symbol = Symbol();
  protected queryChanged() {}
  constructor() {
    super();
    for (let key of breakpoints) {
      this.subscriptions[key] = mediaSubjectPool[key]
        .pipe(
          filter(
            match => (match.origin && match.origin === this.symbol) || true
          )
        )
        .subscribe({
          next: this.listener.bind(this)
        });
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.dispatchEvent(
      Object.assign(new Event("resize"), { origin: this.symbol })
    );
  }
  matchQuery(event) {
    let query = this.query;
    if (this.query.includes("--")) {
      //replace query variables with computed values
      query = this.query.replace(/var\(--[a-zA-z\-]*\)/g, value => {
        let variables = value.match(/--[a-zA-z\-]*/);
        if (!variables) return value;
        let [breakpoint] = variables.map(
          variable =>
            event.computedBreakpoints[variable.replace("--", "")] || ""
        );
        return breakpoint;
      });
    }
    return window.matchMedia(query);
  }
  listener(query) {
    const changed = query.matches !== this[query.key];
    if (changed) {
      if (query.key === "query") this.matches = query.matches;
      else this[query.key] = query.matches;
      if (this.queryChanged) this.queryChanged();
    }
  }
  attributeChangedCallback(name, _, value) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(name, _, value);
    }
    if (name === "query" && this.query) {
      if (this.subscriptions!.query) {
        this.subscriptions!.query.unsubscribe();
      }
      if (!mediaSubjectPool[this.query]) {
        mediaSubjectPool[this.query] = resizeObserver.pipe(
          map(event => {
            let { matches } = this.matchQuery(event);
            return {
              key: "query",
              matches,
              id: this.symbol
            } as MediaMatcher;
          }),
          multicast(new Subject()),
          refCount()
        );
      }
      if (!this.subscriptions) this.subscriptions = {};
      this.subscriptions.query = mediaSubjectPool[this.query].subscribe({
        next: this.listener.bind(this)
      });
    }
  }
  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    for (let sub of Object.values(this.subscriptions)) {
      sub.unsubscribe();
    }
  }
  render() {
    return html`
      <slot></slot>
    `;
  }
}
