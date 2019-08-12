import { bazaarElement } from "@bazaar/base";
import { Layout } from "./base";
import { css } from "lit-element";

enum SectionSizes {
  small,
  medium,
  large
}

/**
 * @cssvar
 */

@bazaarElement("section")
export class Section extends Layout {
  static sizes = SectionSizes;
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          --section-padding: 3rem 1.5rem;
          --section-padding-medium: 9rem 1.5rem;
          --section-padding-large: 18rem 1.5rem;
          padding: var(--section-padding);
          display: flex;
        }
        @media screen and (min-width: var(--desktop, 1024px)) {
          :host([size="medium"]) {
            padding: var(--section-padding-medium);
          }
          :host([size="large"]) {
            padding: var(--section-padding-large);
          }
        }
      `
    ];
  }
}
