import { bazaarElement } from "@bazaar/base";
import { css } from "lit-element";
import { Layout } from "./base";

/**
 * @cssvar column-gap
 * @cssvar cutoff
 */

@bazaarElement("row")
export class Row extends Layout {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          --column-gap: 0.75rem;
          --cutoff: 767px;
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin: 0 calc(var(--column-gap) * -1);
          padding: 0 var(--column-gap);
        }
        ::slotted(*) {
          display: block;
          flex-basis: 0;
          flex-grow: 1;
          flex-shrink: 1;
          padding: 0 var(--column-gap, 0px);
        }
        @media screen and (min-width: var(--cutoff)) {
          ::slotted(*) {
            flex: none;
            width: 100%;
          }
        }
      `
    ];
  }
}
