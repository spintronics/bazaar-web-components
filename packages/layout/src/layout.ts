import { LitElement, css, html, customElement } from "lit-element";
import style from "./layout.style.js";

export class Layout extends LitElement {
  static styles = [
    style,
    css`
      :host {
        display: block;
      }
    `
  ];
  render() {
    return html`
      <slot></slot>
    `;
  }
}

/**
 * @cssvar section-padding
 * @cssvar section-padding-medium
 * @cssvar section-padding-large
 * @classname is-medium
 * @classname is-large
 */
@customElement("abu-section")
export class Section extends Layout {
  constructor() {
    super();
    this.classList.add("section");
  }
}

/**
 * @cssvar background-color
 * @cssvar color
 * @classname is-small
 * @classname is-medium
 * @classname is-large
 */

@customElement("abu-hero")
export class Hero extends Layout {
  constructor() {
    super();
    this.classList.add("hero");
  }
  render() {
    return html`
      <slot name="head" class="hero-head"></slot>
      <slot name="body" class="hero-body"></slot>
      <slot name="foot" class="hero-foot"></slot>
    `;
  }
}

/**
 * @cssvar is-fluid
 * @cssvar is-widescreen
 * @cssvar is-fullhd
 */

@customElement("abu-container")
export class Container extends Layout {
  constructor() {
    super();
    this.classList.add("container");
  }
}

@customElement("abu-flex")
export class Flex extends Layout {
  static styles = [
    css`
      :host {
        display: flex;
      }
    `
  ];
}

/**
 * @cssvar --column-gap
 */
@customElement("abu-row")
export class Columns extends Flex {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          displat: flex;
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
      `
    ];
  }
}

/**
 * @cssvar --column-padding
 * @classname has_padding_around
 */
@customElement("abu-column")
export class Column extends Flex {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          flex-direction: column;
        }
      `
    ];
  }
}

export class Block extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];
}
