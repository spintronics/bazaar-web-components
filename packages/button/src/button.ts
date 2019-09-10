/// <reference path="../../globals.d.ts" />
import { customElement, css } from "lit-element";
// import { layout } from '@bazaar/layout';
// import { ifDefined } from "lit-html/directives/if-defined";
// import prop from 'ramda/es/prop';
// import globalStyles from "@bazaar/styles";
import { Button as MaterialButton } from "@material/mwc-button";

/**
 * document
 */

@customElement("neo-button")
export class Button extends MaterialButton {
  static get styles() {
    return css`
      ${super.styles}
      :host {
        --button-color: var(--color-primary, black);
        --button-background: white;
        --button-background--hover: var(--color-primary, white);
        --button-color--hover: var(--button-background, black);
        --button-background--disabled: transparent;
        --button-color--disabled: var(--grey-light, white);
      }
      :host button {
        transition: var(--transition, 0.3s all ease-in);
      }
      :host button .mdc-button/*, ios*/ {
        color: var(--button-color--disabled);
        background-color: var(--button-background--disabled);
      }
      :host button:after,
      :host button:before {
        background-color: var(--button-background--disabled);
      }
      :host button:not(:disabled) {
        color: var(--button-color);
        background-color: var(--button-background);
        border-color: var(--button-border-color, --button-background);
      }
      :host button:hover {
        background-color: var(--button-background--hover);
        color: var(--button-color--hover);
      }
      :host button:before {
        background-color: var(--button-background--active, --button-background);
      }
      :host button:after {
        background-color: var(--button-background--active, --button-background);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "neo-material-button": Button;
  }
}
