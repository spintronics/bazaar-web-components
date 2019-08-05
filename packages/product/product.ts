import {css,html,property,LitElement}from'lit-element';/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}// import { elementName } from '../../element-helpers';
// import { memoize } from 'decko';
// import { windowIsDefined } from '../../../scripts/lib';
// import { withConnection } from 'mixins/';
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.productID = '';
        _this.loading = false;
        return _this;
    }
    Object.defineProperty(Product, "styles", {
        get: function () {
            return [
                _super.styles || css(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
                css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        :host(.layout--compact) {\n          --gap: 0.75rem;\n        }\n      "], ["\n        :host(.layout--compact) {\n          --gap: 0.75rem;\n        }\n      "]))),
            ];
        },
        enumerable: true,
        configurable: true
    });
    Product.prototype.render = function () {
        return html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      ", "\n    "], ["\n      ", "\n    "])), this.productID);
    };
    __decorate([
        property({ type: String })
    ], Product.prototype, "productID", void 0);
    __decorate([
        property({ type: Boolean })
    ], Product.prototype, "loading", void 0);
    return Product;
}(LitElement));
var templateObject_1, templateObject_2, templateObject_3;
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
*/export{Product};//# sourceMappingURL=product.ts.map
