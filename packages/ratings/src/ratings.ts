import { LitElement, property, css, html, customElement } from "lit-element";
// import style from "./ratings.style";
import sum from "ramda/es/sum";
import "@bazaar/progress";
// import { repeat } from 'lit-html/directives/repeat';
// import "@bazaar/layout";
import "@bazaar/icon";
import { styleMap } from "lit-html/directives/style-map";

interface Review {
  rating: number;
  message: String;
  reviewer: String;
  upvotes: number;
  downvotes: number;
  lastEdited: number;
}

interface ReviewTotals {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface RatingProperties {
  totals: ReviewTotals;
  reviews: Review[];
  average: number;
  productID: string;
}
/**
 * @slot progress-bar
 * @action view-all
 * @action view-specific
 */

@customElement("neo-ratings")
export class Ratings extends LitElement implements RatingProperties {
  @property({ type: Boolean }) hidden = false;
  @property({ type: Array }) reviews = [];
  @property({ type: String }) productID = "12345";
  @property({ type: Number }) average = 0;
  name = "ratings";
  totals = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  totalReviews = 0;
  groupedReviews: Map<number, Review[]> = new Map([
    [1, []],
    [2, []],
    [3, []],
    [4, []],
    [5, []]
  ]);
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `
    ];
  }
  deriveProperties() {
    this.totalReviews = sum(Object.values(this.totals));
    this.groupedReviews = this.groupByRating();
  }
  update(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("reviews") || changedProperties.has("totals")) {
      this.deriveProperties();
    }
    super.update(changedProperties);
  }
  // calculateAverage() {
  //   const reviewRatings = this.reviews.map((review: Review) => review.rating);
  //   if (!reviewRatings.length) return 0;
  //   return sum(reviewRatings) / reviewRatings.length;
  // }
  groupByRating() {
    this.groupedReviews.clear();
    return this.reviews.reduce((acc, review: Review) => {
      let groupIndex = Math.round(review.rating);
      let group = acc.get(groupIndex) || [];
      acc.set(groupIndex, group.concat([review]));
      return acc;
    }, this.groupedReviews);
  }
  constructor() {
    super();
    this.deriveProperties();
  }
  protected starIcon(filled = true) {
    return html`
      <neo-icon
        style=${styleMap({
          verticalAlign: "middle"
          // "--icon-font-size": "1rem"
        })}
        >${filled ? "star" : "star_border"}</neo-icon
      >
    `;
  }
  protected percentageIndicator(value = 0) {
    return html`
      <neo-progress determinate progress=${value} buffer="1"></neo-progress>
    `;
  }
  protected reviewLink(
    rating: string | number = 1,
    text: string | number = ""
  ) {
    return html`
      <a href="/product/${this.productID}/reviews?rating=${rating}">${text}</a>
    `;
  }
  render() {
    let fiveStar = Array(5).fill(0);
    let shrink = {
      flexGrow: "0",
      whiteSpace: "nowrap"
    };
    return html`
      <h3>
        Overall rating ${this.starIcon()} ${this.average.toFixed(1)}
      </h3>
      <h4>Based on ${this.reviews.length} reviews</h4>
      <div>
        ${[5, 4, 3, 2, 1].map((count, _) => {
          let group = this.groupedReviews.get(count) || [];
          return html`
            <neo-row style=${styleMap({ "--column-gap": "16px" })}>
              <neo-flex style=${styleMap(shrink)}>
                ${fiveStar.map((_, dex) => this.starIcon(dex < count))}
              </neo-flex>
              <neo-flex style=${styleMap({ alignItems: "center" })}>
                ${this.percentageIndicator(
                  this.totals[count] / this.totalReviews
                )}
              </neo-flex>
              <neo-flex style=${styleMap(shrink)}>
                (${this.reviewLink(1, group.length)})
              </neo-flex>
            </neo-row>
          `;
        })}
        <p>
          ${this.reviewLink("", `View all ${this.totalReviews} reviews`)}
        </p>
      </div>
    `;
  }
}
