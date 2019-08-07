import { customElement, css } from "lit-element";
// import { layout } from '@bazaar/layout';
// import { ifDefined } from "lit-html/directives/if-defined";
// import prop from 'ramda/es/prop';
// import globalStyles from "@bazaar/styles";
import { Button as MaterialButton } from "@material/mwc-button";
const style = require("./button.scss");

/**
 * document
 */

@customElement("abu-material-button")
export class Button extends MaterialButton {
  static get styles() {
    return css`
      ${super.styles}
      ${style.default}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "abu-material-button": Button;
  }
}
