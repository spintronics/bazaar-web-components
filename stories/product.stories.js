import { text, color, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { storiesOf } from "@storybook/polymer";

import { Product } from "../packages/product/product.js";

// window.customElements.define('abu-product', Product);
storiesOf("abu-product", module)
  // .addDecorator(withKnobs)
  .add(
    "search product",
    () => html`
      <abu-product></abu-product>
    `
  );
