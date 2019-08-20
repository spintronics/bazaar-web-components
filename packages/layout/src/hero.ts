import { Layout } from "./base";
import { html } from "lit-html";
import { css, customElement } from "lit-element";

/**
 * @cssvar background-color
 * @cssvar color
 */

@customElement("neo-hero")
export class Hero extends Layout {
  static get styles() {
    return [
      ...super.styles,
      css`
        --background-color: white;
        --color: black;
        align-items: stretch;
        display: flex;
        flex-direction: column;
        justify-content: center;
        ::slotted(*) {
          flex-grow: 1;
          flex-shrink: 0;
          padding: 3rem 1.5rem;
        }
        ::slotted([slot="head"]) {
          flex-grow: 0;
          flex-shrink: 0;
        }
        ::slotted([slot="foot"]) {
          flex-grow: 0;
          flex-shrink: 0;
        }
      `
    ];
  }
  render() {
    return html`
      <slot name="head"></slot>
      <slot></slot>
      <slot name="foot"></slot>
    `;
  }
}
