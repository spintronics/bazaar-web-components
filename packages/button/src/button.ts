/// <reference path="../../globals.d.ts" />
import { customElement, css } from "lit-element";
// import { layout } from '@bazaar/layout';
// import { ifDefined } from "lit-html/directives/if-defined";
// import prop from 'ramda/es/prop';
// import globalStyles from "@bazaar/styles";
import { Button as MaterialButton } from "@material/mwc-button";
import style from "./button.scss";

/**
 * document
 */

@customElement("abu-material-button")
export class Button extends MaterialButton {
  static get styles() {
    return css`
      ${super.styles}
      ${style}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "abu-material-button": Button;
  }
}
