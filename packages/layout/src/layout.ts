import { LitElement, css, html, customElement } from "lit-element";
import style from "./layout.style";

export class Layout extends LitElement {
  static styles = [style];
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
 * @cssvar --column-padding
 * @classname has_padding_around
 */
@customElement("abu-row")
export class Row extends Flex {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          flex-flow: row nowrap;
          justify-content: space-around;
        }
        :host(.has_padding_around) {
          margin: 0 -15px;
          padding: 0 15px;
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
