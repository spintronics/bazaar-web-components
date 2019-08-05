import { LitElement, property, css, html } from 'lit-element';
// import style from './element.style';
interface Elementary {
  name: String;
  hidden: Boolean;
}
export class Element extends LitElement implements Elementary {
  @property({ type: Boolean }) hidden = false;
  name = 'element';
  static get style() {
    return [css``];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  render() {
    return html``;
  }
}
