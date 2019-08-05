import { LitElement, property, css, html } from 'lit-element';
import {
  concat,
  sortWith,
  split,
  splitAt,
  reverse,
  compose,
  map,
  apply,
  filter,
  prop,
  ascend,
  descend,
} from 'ramda/es';

interface Sortable {
  childObserver: MutationObserver;
}
export class Sorted extends LitElement implements Sortable {
  @property({ type: String }) sort = 'slot:asc';
  @property({ type: Number }) offset = 0;
  @property({ type: Array }) order = [];
  childObserver;
  static get style() {
    return css`
      :host {
        width: 100%;
        display: grid;
      }
      ::slotted(*) {
        display: grid-item;
      }
    `;
  }
  constructor() {
    super();
    this.childObserver = new MutationObserver(_ => {
      //listening to changes to children since it can't be watched like a normal attribute
      super.requestUpdate();
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.childObserver.observe(this, {
      childList: true,
    });
  }
  disconnectedCallback() {
    this.childObserver.disconnect();
    super.disconnectedCallback();
  }
  rotate() {
    this.offset = this.offset + 1;
  }
  render() {
    /**
     * children may be sorted by their shared attributes
     * the slot attribute should just be the index of the child element
     * example:
     * <list sort="name:asc|slot:asc">
     *  <any name="b" slot="0">
     *  <any name="a" slot="2">
     *  <any name="a" slot="1">
     * </list>
     * <list sort="name:asc|slot:asc">
     *  <any name="a" slot="1">
     *  <any name="a" slot="2">
     *  <any name="b" slot="0">
     * </list>
     * they will be progressively sorted by the | separated definitions
     */
    this.order = compose(
      map(child => child.slot),
      compose(
        apply(concat),
        reverse,
        splitAt(this.offset % this.children.length),
      ),
      sortWith(
        compose(
          map(([key = '', direction = '']) => {
            return (direction.includes('desc') ? descend : ascend)(el => {
              let value = el.getAttribute(key);
              let num = Number.parseInt(value);
              return num == value ? num : value;
            });
          }),
          map(split(':')),
          split('|'),
        )(this.sort),
      ),
      filter(prop('slot')),
      Array.from,
    )(this.children);

    return html`
      ${this.order.map(
        index =>
          html`
            <slot name="${index}"></slot>
          `,
      )}
    `;
  }
}
