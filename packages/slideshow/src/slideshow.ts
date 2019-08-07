import {
  LitElement,
  query,
  property,
  css,
  html,
  customElement
} from "lit-element";
@customElement("abu-slideshow")
export class Slideshow extends LitElement {
  @query('[action="previous"]') previousSlide;
  @query('[action="next"]') nextSlide;
  @property({ type: Boolean }) isScrolling = false;
  @property({ type: Number }) offset = 0;
  @property({ type: Number }) timeout = 0;
  static get styles() {
    return [
      super.styles || css``,
      css`
        :host {
          display: block;
          width: 100%;
          position: relative;
          display: flex;
          align-items: stretch;
          height: var(--slide-height, initial);
        }

        .slide-container {
          overflow: auto;
          position: relative;
          scroll-snap-type: x mandatory;
          display: block;
          overflow: scroll hidden;
          position: relative;
          height: 100%;
          white-space: nowrap;
        }
        ::slotted(*) {
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
      `
    ];
  }
  constructor() {
    super();
    this.offset = 0;
    this.timeout;
    this.isScrolling;
  }
  onScroll() {}
  render() {
    return html`
      <style>
        .slide-container::-webkit-scrollbar {
          display: none;
        }
        .slide-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      </style>
      <k-sorted-list
        sort="name:asc"
        @scroll=${this.onScroll}
        class="slide-container"
        offset=${this.offset}
      >
        ${Array(this.children.length)
          .fill(0)
          .map((_, index) => {
            return html`
              <slot name=${index} slot=${index}> </slot>
            `;
          })}
      </k-sorted-list>
    `;
  }
}
