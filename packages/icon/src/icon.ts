import { customElement, css, LitElement, html, property } from "lit-element";
// import style from './element.style';
import { style as material } from "@material/mwc-icon/mwc-icon-host-css";
// import { layout } from '@bazaar/layout';

export enum IconFamilies {
  material = "https://fonts.googleapis.com/icon?family=Material+Icons",
  ionic = "https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js",
  awesome = "https://kit.fontawesome.com/f068e4a895.js"
}

const loaded = {
  material: false
};

export function injectIconFont(type, callback = () => {}) {
  if (loaded[type]) return callback();
  const fontEl = document.createElement("link");
  fontEl.id = name;
  fontEl.rel = "stylesheet";
  fontEl.href = IconFamilies[type];
  fontEl.setAttribute("async", "true");
  fontEl.onload = () => {
    loaded[type] = true;
    callback();
  };
  (loaded as any).material = fontEl.onload;
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

@customElement("neo-icon")
export class Icon extends LitElement {
  @property({ type: String }) family = "material";
  constructor() {
    super();
    injectIconFont(this.family, this.requestUpdate.bind(this));
  }
  static get styles() {
    return [
      material,
      css`
        :host(:not(.fas)) {
          font-family: var(--icon-font, "Material Icons");
          font-size: var(--icon-font-size, inherit);
          font-display: block;
        }
        :host(.ios) {
        }
      `
    ];
  }
  render() {
    return html`
      ${loaded[this.family]
        ? html`
            <slot></slot>
          `
        : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "neo-icon": Icon;
  }
}
