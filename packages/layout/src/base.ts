import { html } from "lit-html";
import { css, LitElement } from "lit-element";
import { bazaarElement } from "@bazaar/base";

@bazaarElement("layout")
export class Layout extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          transition: all var(--speed, 86ms) var(--easing, ease-in);
        }
        :host([hidden]) {
          display: none;
        }
      `
    ];
  }
  render() {
    return html`
      <slot></slot>
    `;
  }
}
