import { text, color, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { storiesOf } from "@storybook/polymer";

import { Ratings } from "../packages/ratings/ratings.js";
import "@material/mwc-icon";
// import '@material/mwc-linear-progress';

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
  totals: {
    1: 1,
    2: 0,
    3: 0,
    4: 0,
    5: 1
  },
  reviews: [
    review,
    {
      ...review,
      rating: 1,
      message: "the product is great but i'm having a bad day"
    }
  ]
};

storiesOf("ratings", module)
  .addDecorator(withKnobs)
  .add(
    "full-size",
    () => html`
      <abu-ratings
        productID=${fixture.productID}
        .totals=${fixture.totals}
        .reviews=${fixture.reviews}
        average=${2.5}
        style="width: 500px;"
      ></abu-ratings>
    `
  );
