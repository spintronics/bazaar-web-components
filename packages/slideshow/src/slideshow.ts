import {
  LitElement,
  query,
  property,
  css,
  html,
  customElement
} from "lit-element";
import "@bazaar/sorted";

/**
 * after settle re-order items and set scroll to the start
 * to give the illusion of infinite scrolling
 * add arrow/dots slots
 */
@customElement("neo-slideshow")
export class Slideshow extends LitElement {
  @query('[action="previous"]') previousSlide;
  @query('[action="next"]') nextSlide;
  @query(".slide-track") track;
  @query(".selector-list") selectorList;
  @property({ type: Number }) offset = 0;
  @property({ type: Number, reflect: true }) index = 0;
  @property({ type: Number, reflect: true }) show_selector = 0;
  protected scrolling = false;
  protected scrollTimeout;
  protected get selector() {
    let slides = this.querySelectorAll(".slide") || [];
    return html`
      <div class="selector-list">
        ${Array(slides.length)
          .fill(0)
          .map((_, x) => {
            return html`
              <span
                index=${x}
                ?selected=${this.index === x}
                class="selector"
                @click=${this.goto.bind(this, x)}
              ></span>
            `;
          })}
      </div>
    `;
  }
  static get styles() {
    return [
      css`
        :host {
          display: block;
          width: 100%;
          position: relative;
          display: flex;
          align-items: stretch;
          height: var(--slide-height, initial);
        }

        .slide-track {
          overflow: auto;
          position: relative;
          scroll-snap-type: x mandatory;
          display: block;
          overflow: scroll hidden;
          position: relative;
          height: 100%;
          white-space: nowrap;
        }

        ::slotted(.slide) {
          display: inline-flex;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          color: white;
          border-radius: var(--radius, 4px);
          justify-content: middle;
          justify-items: middle;
          height: 100%;
          width: var(--slide-width, 100%);
          scroll-snap-align: start;
          white-space: normal;
          flex-flow: column nowrap;
        }

        .selector-list {
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: 1em;
          transform: translateX(-50%);
        }

        .selector {
          display: inline-block;
          height: 1em;
          width: 1em;
          border-radius: var(--rounded, 300px);
          border: 2px solid white;
          box-shadow: 0px 0px 5px 1px black;
          margin-right: 1em;
        }

        .selector[selected] {
          background: white;
        }

        ::slotted(:not(.slide)) {
          position: absolute;
          z-index: 3;
          color: white;
          text-shadow: 0 0 5px black;
          font-size: 5em;
        }

        ::slotted([slot="next"]) {
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        ::slotted([slot="previous"]) {
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      `
    ];
  }
  previous() {
    this.goto(this.index - 1);
  }
  next() {
    this.goto(this.index + 1);
  }
  setSlide(index?) {
    index =
      index ||
      Array.from(this.querySelectorAll(".slide"))
        .map(slide => (slide as HTMLElement).offsetLeft)
        .indexOf(this.track.scrollLeft);
    if (index !== -1) {
      this.selectorList
        .querySelector("[selected]")!
        .removeAttribute("selected");
      this.selectorList
        .querySelector(`[index="${index}"]`)!
        .setAttribute("selected", "true");
      this.index = index;
    }
  }
  goto(index) {
    if (this.scrolling) return;
    let slides = this.querySelectorAll(".slide");
    let slide = slides[index];
    if (!slide) return;
    this.setSlide(index);
    this.track.scrollLeft = (slide as HTMLElement).offsetLeft;
  }
  scrollWatch() {
    this.scrolling = true;
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.scrolling = false;
      this.setSlide();
    }, 200);
  }
  render() {
    return html`
      <style>
        .slide-track::-webkit-scrollbar {
          display: none;
        }
        .slide-track {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      </style>
      <slot name="previous" @click=${this.previous.bind(this)}></slot>
      <slot name="next" @click=${this.next.bind(this)}></slot>
      ${this.selector}
      <neo-sorted
        class="slide-track"
        offset=${this.offset}
        @scroll=${this.scrollWatch.bind(this)}
      >
        ${Array(this.children.length)
          .fill(0)
          .map((_, index) => {
            return html`
              <slot name=${index} slot=${index}> </slot>
            `;
          })}
      </neo-sorted>
    `;
  }
}
