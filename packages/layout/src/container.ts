import { css, customElement } from "lit-element";
import { Media } from "./media";

/**
 * @cssvar background-color
 * @cssvar color
 */

@customElement("neo-container")
export class Container extends Media {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          flex-grow: 1;
          margin: 0 auto;
          position: relative;
          width: auto;
        }
        :host([desktop]) {
          max-width: calc(var(--desktop) - var(--container-offset));
        }
        :host([desktop][fluid]) {
          margin-left: var(--gap);
          margin-right: var(--gap);
          max-width: none;
        }
        :host([widescreen]) {
          max-width: calc(var(--widescreen) - var(--container-offset));
        }
        :host([fullhd]) {
          max-width: calc(var(--fullhd) - var(--container-offset));
        }
      `
    ];
  }
}
