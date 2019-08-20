import { css, html, customElement } from "lit-element";
import { Layout } from "./base";

@customElement("neo-card")
export class Card extends Layout {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
          padding: var(--card-padding, 0.75rem);
          max-width: 100%;
          position: relative;
          display: flex;
          flex-flow: column nowrap;
          flex-grow: 1;
          flex-basis: 100%;
        }
        :host(:hover) {
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        }
        ::slotted([slot="header"]) {
          display: flex;
          align-items: stretch;
          padding: 0.75rem 0;
        }
        ::slotted([slot="content"]) {
          padding: var(--card-content-padding, 1.5rem) 0;
          flex-grow: 1;
        }
        ::slotted([slot="footer"]) {
          display: flex;
          align-items: stretch;
          padding: 0.75rem 0;
        }
      `
    ];
  }
  render() {
    return html`
      <slot name="header"></slot>
      <slot name="content"></slot>
      <slot name="footer"></slot>
    `;
  }
}
