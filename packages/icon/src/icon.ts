import { customElement, css, LitElement, html } from "lit-element";
// import style from './element.style';
import { style as material } from "@material/mwc-icon/mwc-icon-host-css";
// import { layout } from '@bazaar/layout';

export enum IconFamilies {
  material = "https://fonts.googleapis.com/icon?family=Material+Icons",
  ionic = "https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js",
  awesome = "https://kit.fontawesome.com/f068e4a895.js"
}

export function injectIconFont(type: IconFamilies) {
  const fontEl = document.createElement("link");
  fontEl.id = name;
  fontEl.rel = "stylesheet";
  fontEl.href = IconFamilies[type];
  document.head!.appendChild(fontEl);
}

/**
 * @cssvar icon-font
 * @cssvar font-size
 *
 * TODO:
 * unify the icons families and make a dictonary of available options
 * for code completion. create a linking to the cdn svg version so that a whole
 * font file doesn't have to be added to use one icon. These should be loaded
 * by utilizing an intersection observer.
 */

@customElement("abu-icon")
export class Icon extends LitElement {
  static family = "material";
  constructor() {
    super();
    // bring this yourself so these load faster
    // injectIconFont((this.constructor as any).family);
  }
  static get styles() {
    return [
      material,
      css`
        :host(:not(.fas)) {
          font-family: var(--icon-font, "Material Icons");
          font-size: var(--icon-font-size, inherit);
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

declare global {
  interface HTMLElementTagNameMap {
    "abu-icon": Icon;
  }
}
