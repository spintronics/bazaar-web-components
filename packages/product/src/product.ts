// import { Product as ProductType } from 'schema-dts';
import { LitElement, property, css, html } from 'lit-element';
// import { elementName } from '../../element-helpers';
// import { memoize } from 'decko';
// import { windowIsDefined } from '../../../scripts/lib';
// import { withConnection } from 'mixins/';
export class Product extends LitElement {
  @property({ type: String }) productID = '';
  @property({ type: Boolean }) loading = false;
  static get styles() {
    return [
      super.styles || css``,
      css`
        :host(.layout--compact) {
          --gap: 0.75rem;
        }
      `,
    ];
  }
  render() {
    return html`
      ${this.productID}
    `;
  }
}

/**
import {Product} from '@kibo-custom-elements/product'
import {ConnectedMixin} from '@kibo-mixins/connected-mixin'

window.customElements.define(
 'kibo-product',
 class extends compose(
   ConnectedMixin({
     observable: store,
     getInitialState: store.getState,
     stateMap: {
        options: state => {
           //follow schema.org to make 'enhancedCommerce' easier
          state.pages.product.model.options.map(option => {
            return {"@type": "PropertyValue", name: "color", value: "crimson"}
          })
        }
      }
   }),
   ActionInterfaceMixin({
     addToCart(...) { productModel.addToCart(); }
   })
 )(Product) {
   static get stateMap() {
     return {
       }
     }
   }
   static get styles() {
     return [
       super.styles,//mostly for loading/hidden/defaults etc,
       css`//custom styles
         ::slotted(*) {
           border: 1px solid red;
         }
         :host {
           --primary: #deface;
         }
       `
     ]
   }
 }
)
<main id="product-page">
  dont use in backbone views or accept having to re-bind
  <kibo-product -layout="compact" initialState="{% dump model %}">
    <p slot="description">it's about making placeholder text great again.</p>
  </kibo-product>
</main>
*/
