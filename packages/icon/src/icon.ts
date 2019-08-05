import { customElement, css, LitElement, html } from "lit-element";
// import style from './element.style';
import { style as material } from "@material/mwc-icon/mwc-icon-host-css";
// import { layout } from '@bazaar/layout';

enum iconFamilies {
  material = "https://fonts.googleapis.com/icon?family=Material+Icons"
}

function injectIconFont(type: iconFamilies) {
  const fontEl = document.createElement("link");
  fontEl.id = fontEl.rel = "stylesheet";
  fontEl.href = iconFamilies[type];
  document.head!.appendChild(fontEl);
}

/**
 * @cssvar icon-font
 * @cssvar font-size
 */

@customElement("abu-icon")
export class Icon extends LitElement {
  constructor() {
    super();
    injectIconFont(iconFamilies.material);
  }
  static get styles() {
    return [
      css`
        :host {
          ${material}
          font-family: var(--icon-font, "Material Icons");
          font-size: var(--icon-font-size, inherit);
        }
        :host(.fa) {
        }
        :host(.ios) {
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
