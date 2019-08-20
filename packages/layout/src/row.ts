import { css, customElement } from "lit-element";
import { Media } from "./media";

/**
 * @cssvar row-column-gap
 * @cssvar row-cutoff
 */

@customElement("neo-row")
export class Row extends Media {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host([gapless]) {
          margin: 0;
          padding-left: 0;
          padding-right: 0;
        }
        ::slotted(*) {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        :host {
          --row-column-gap: 0.75rem;
        }

        :host([tablet]) {
          display: flex;
          justify-content: space-around;
          align-items: stretch;
          margin: 0 calc(var(--row-column-gap) * -1);
        }
        :host([tablet][gapless]) {
          margin: 0;
        }

        :host([tablet]) ::slotted(*) {
          display: flex;
          flex-basis: 0;
          flex-grow: 1;
          flex-shrink: 1;
          padding: 0 calc(var(--row-column-gap) / 2);
        }

        :host([gapless]) ::slotted(*) {
          padding-left: 0;
          padding-right: 0;
        }

        :host([tablet]:not([gapless])) ::slotted(:first-child) {
          padding-left: var(--row-column-gap) !important;
        }
        :host([tablet]:not([gapless])) ::slotted(:last-child) {
          padding-right: var(--row-column-gap) !important;
        }
      `
    ];
  }
}
