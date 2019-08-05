import { LitElement, property, css, html, customElement } from "lit-element";
import style from "./button.style";
// import { layout } from '@bazaar/layout';
import { ifDefined } from "lit-html/directives/if-defined";
// import prop from 'ramda/es/prop';

interface ButtonProperties {
  icon?: String;
  trailingIcon?: Boolean;
  dense?: Boolean;
  outlined?: Boolean;
  unelevated?: Boolean;
  raised?: Boolean;
  type?: string;
  id?: string;
  onclick?(Event): void;
}

interface IButtonProperties {
  properties: ButtonProperties;
}

/**
 * document
 */

// @layout({
//   variables: [
//     'button-family',
//     'button-border-width',
//     'button-padding-vertical',
//     'button-border-radius',
//     'button-background-color',
//     'button-border-color',
//     'button-box-shadow',
//     'button-color',
//     'button-background-color--hover',
//     'button-border-color--hover',
//     'button-box-shadow--hover',
//     'button-color--hover',
//     'button-background-color--active',
//     'button-border-color--active',
//     'button-box-shadow--active',
//     'button-color--active',
//     'button-background-color--selected',
//     'button-border-color--selected',
//     'button-box-shadow--selected',
//     'button-color--selected',
//     'button-background-color--disabled',
//     'button-border-color--disabled',
//     'button-box-shadow--disabled',
//     'button-color--disabled',
//     'transition',
//   ],
// })
@customElement("abu-button")
export class Button extends LitElement implements IButtonProperties {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Object }) properties: ButtonProperties = {};
  @property({ type: String, reflect: true }) role = "button";
  @property({ type: String }) type = "button";
  @property({ type: String }) id = "button";
  name = "button";
  static styles = [style, css``];
  constructor() {
    super();
  }
  render() {
    return html`
      <button
        id="${this.id}"
        aria-hidden="false"
        type="${this.type}"
        ?disabled="${this.disabled}"
        name="${ifDefined(this.name)}"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "polymer-button": Button;
  }
}
