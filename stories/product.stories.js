import { text, color, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { storiesOf } from "@storybook/polymer";

import { Product } from "../packages/product/src/product.ts";
import { injectSchema } from "./spectacle.js";
import "../packages/layout/src/layout.ts";

let productModel = JSON.stringify({
  "@context": "http://schema.org",
  "@type": "Product",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "3.5",
    reviewCount: "11"
  },
  description:
    "0.7 cubic feet countertop microwave. Has six preset cooking categories and convenience features like Add-A-Minute and Child Lock.",
  name: 'Kenmore White 17" Microwave',
  image: "https://picsum.photos/350",
  offers: {
    "@type": "Offer",
    availability: "http://schema.org/InStock",
    price: "55.00",
    priceCurrency: "USD"
  },
  review: [
    {
      "@type": "Review",
      author: "Ellie",
      datePublished: "2011-04-01",
      description: "The lamp burned out and now I have to replace it.",
      name: "Not a happy camper",
      reviewRating: {
        "@type": "Rating",
        bestRating: "5",
        ratingValue: "1",
        worstRating: "1"
      }
    },
    {
      "@type": "Review",
      author: "Lucas",
      datePublished: "2011-03-25",
      description:
        "Great microwave for the price. It is small and fits in my apartment.",
      name: "Value purchase",
      reviewRating: {
        "@type": "Rating",
        bestRating: "5",
        ratingValue: "4",
        worstRating: "1"
      }
    }
  ]
});

storiesOf("product", module)
  // .addDecorator(withKnobs)
  .add("search product", () => {
    return html`
      <neo-container>
        <neo-row>
          <neo-product model="${productModel}"></neo-product>
          <neo-product model="${productModel}"></neo-product>
          <neo-product model="${productModel}"></neo-product>
          <neo-product model="${productModel}"></neo-product>
        </neo-row>
      </neo-container>
    `;
  });
