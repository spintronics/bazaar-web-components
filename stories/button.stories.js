import { text, color, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { storiesOf } from "@storybook/polymer";

import { Button } from "../packages/button/button.js";
import "weightless/icon";
import "weightless/progress-bar";

const review = {
  rating: 5,
  message: "i'm really happy with the money i'm getting to write this review",
  reviewer: "human",
  upvotes: 50,
  downvotes: 50,
  lastEdited: 12345
};

const fixture = {
  productID: 12345,
  reviews: [
    review,
    {
      ...review,
      rating: 1,
      message: "the product is great but i'm having a bad day"
    }
  ]
};

storiesOf("button", module)
  // .addDecorator(withKnobs)
  .add(
    "solid",
    () => html`
      <abu-button>basic</abu-button>
    `
  );
