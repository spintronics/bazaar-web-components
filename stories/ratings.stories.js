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
  // .addDecorator(withKnobs)
  .add(
    "full-size",
    () => html`
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <abu-ratings .reviews=${fixture}></abu-ratings>
    `
  );
