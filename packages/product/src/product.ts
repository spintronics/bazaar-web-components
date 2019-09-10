import { LitElement, property, css, html, customElement } from "lit-element";
import { Product as ProductSchema } from "schema-dts";
import "@bazaar/image";
import "@bazaar/icon";
import "@bazaar/button";
import "@bazaar/layout";
import { broadcast } from "@bazaar/base";
import pathOr from "ramda/es/pathOr";

export enum ProductIntent {
  add_to_cart = "add_to_cart",
  add_to_wishlist = "add_to_wishlist",
  add_to_compare = "add_to_compare"
}

export interface ProductAttributes {
  model: ProductSchema;
}

//TODO: ProductWithOptions

@customElement("neo-product")
export class Product extends LitElement {
  @property({ type: Object }) model: ProductSchema = {
    "@type": "Product",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 0
    },
    description: "",
    productID: ""
  };
  static get styles() {
    return [
      super.styles || css``,
      css`
        .neo-image {
          max-height: 300px;
        }
      `
    ];
  }
  protected iconMap = {
    wishlist: html`
      <neo-icon>bookmark</neo-icon>
    `,
    add: html`
      <neo-icon>add_shopping_cart</neo-icon>
    `,
    compare: html`
      <neo-icon>compare_arrows</neo-icon>
    `,
    star_empty: html`
      <neo-icon>star_border</neo-icon>
    `,
    star_half: html`
      <neo-icon>star_half</neo-icon>
    `,
    star_filled: html`
      <neo-icon>star</neo-icon>
    `
  };
  render() {
    return html`
      <neo-card>
        <figure slot="content" class="image">
          <neo-image src=${this.model.image}></neo-image>
        </figure>
        <div slot="content">
          <strong>${this.model.name}</strong>
          <div class="rating">
            ${this.model.aggregateRating
              ? Array(5)
                  .fill(
                    pathOr(0, ["aggregateRating", "ratingValue"], this.model)
                  )
                  .map((rating, x) => {
                    let star =
                      "star_" +
                      (rating && rating >= x + 1
                        ? "filled"
                        : rating >= x + 0.5
                        ? "half"
                        : "empty");
                    return html`
                      ${this.iconMap[star]}
                    `;
                  })
              : ""}
          </div>
          <p class="description">
            ${this.model.description}
          </p>
        </div>
        <div slot="footer" class="product-actions">
          <neo-button
            @click=${broadcast({
              type: ProductIntent.add_to_cart,
              data: { productID: this.model.productID, quantity: 1 }
            })}
            >${this.iconMap.add}</neo-button
          >
          <neo-button
            @click=${broadcast({
              type: ProductIntent.add_to_wishlist,
              data: { productID: this.model.productID, quantity: 1 }
            })}
            >${this.iconMap.wishlist}</neo-button
          >
          <neo-button
            @click=${broadcast({
              type: ProductIntent.add_to_compare,
              data: { productID: this.model.productID }
            })}
            >${this.iconMap.compare}</neo-button
          >
        </div>
      </neo-card>
    `;
  }
}

/**
import {Product} from '@kibo-custom-elements/product'
import {ConnectedMixin} from '@kibo-mixins/connected-mixin'

write product information into ld+jsod in head
then load the product model from there and pass it into this element

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
