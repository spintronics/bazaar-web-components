import { LitElement, property, css, html, customElement } from "lit-element";
import style from "./ratings.style";
import sum from "ramda/es/sum";
// import { repeat } from 'lit-html/directives/repeat';
// import '@bazaar/layout';

interface Review {
  rating: number;
  message: String;
  reviewer: String;
  upvotes: number;
  downvotes: number;
  lastEdited: number;
}
interface RatingProperties {
  reviewCount: number;
  reviews: Review[];
  average: number;
  productID: string;
}
/**
 * @slot progress-bar
 * @action view-all
 * @action view-specific
 */

@customElement("abu-ratings")
export class Ratings extends LitElement implements RatingProperties {
  @property({ type: Boolean }) hidden = false;
  @property({ type: Array }) reviews = [];
  name = "ratings";
  reviewCount = 0;
  average = 0;
  groupedReviews: Map<number, Review[]> = new Map([
    [1, []],
    [2, []],
    [3, []],
    [4, []],
    [5, []]
  ]);
  productID = "12345";
  static get style() {
    return [style, css``];
  }
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if ("reviews" in changedProperties) {
      this.average = this.calculateAverage();
      this.groupedReviews = this.groupByRating();
    }
    super.updated(changedProperties);
  }
  calculateAverage() {
    const reviewRatings = this.reviews.map((review: Review) => review.rating);
    if (!reviewRatings.length) return 0;
    return sum(reviewRatings) / reviewRatings.length;
  }
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
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  protected starIcon(filled = true) {
    //override this..
    //assuming mwc-icon registered.. change this to use internal icon
    return html`
      <mwc-icon>${filled ? "star" : "star-border"}</mwc-icon>
    `;
  }
  protected percentageIndicator(value = 0) {
    return html`
      <mwc-linear-progress determinate progress=${value}></mwc-linear-progress>
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
    return html`
      <h3>
        Overall rating ${this.starIcon()} ${this.average.toFixed(1)}
      </h3>
      <div>Based on ${this.reviews.length} reviews</div>
      <abu-flex>
        ${[5, 4, 3, 2, 1].map((count, x) => {
          let group = this.groupedReviews.get(count) || [];
          return html`
            <abu-row>
              <abu-flex --flex-shrink="1">
                ${fiveStar.map((_, dex) => this.starIcon(dex <= x))}
              </abu-flex>
              <abu-flex --flex-grow="1">
                ${this.percentageIndicator(group.length / this.reviewCount)}
              </abu-flex>
              <abu-flex --flex-shrink="1">
                (${this.reviewLink(1, group.length)})
              </abu-flex>
            </abu-row>
          `;
        })}
        <div>
          ${this.reviewLink("", `View all ${this.reviewCount} reviews`)}
        </div>
      </abu-flex>
    `;
  }
}
