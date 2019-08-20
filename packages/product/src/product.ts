import { LitElement, property, css, html, customElement } from "lit-element";
import { Product as ProductSchema, AggregateRating } from "schema-dts";
import "@bazaar/image";
import "@bazaar/icon";
// import { elementName } from '../../element-helpers';
// import { memoize } from 'decko';
// import { windowIsDefined } from '../../../scripts/lib';
// import { withConnection } from 'mixins/';
@customElement("neo-product")
export class Product extends LitElement {
  @property({ type: Object }) model: ProductSchema = {
    "@type": "Product"
  };
  static get styles() {
    return [
      super.styles || css``,
      css`
        :host(.layout--compact) {
          --gap: 0.75rem;
        }
        .image {
          max-height: 300px;
        }
      `
    ];
  }
  render() {
    return html`
      <figure class="image">
        <neo-image src=${this.model.image} lazy></neo-image>
      </figure>
      <strong>${this.model.name}</strong>
      <div class="rating">
        ${/*this.model.aggregateRating
          ? Array(5)
              .fill(0)
              .map((_, x) => {
                return (
                  (<AggregateRating>this.model.aggregateRating).ratingValue >= x
                );
              })
          : */ ""}
      </div>
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
