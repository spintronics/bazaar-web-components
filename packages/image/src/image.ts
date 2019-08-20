/// <reference path="../../globals.d.ts" />

import { customElement, property, html, query, LitElement } from "lit-element";
import { withIntersectionObserver } from "@bazaar/base";
import style from "./image.scss";
import compose from "ramda/es/compose";
import { ifDefined } from "lit-html/directives/if-defined";

interface IImage {
  src?: string;
  placeholder?: string;
  lazy?: boolean;
  alt?: string;
}

/**
 * @slot placeholder
 *
 * TODO:
 * implement srcset / sizes
 */

@customElement("neo-image")
export class Image
  extends compose(
    withIntersectionObserver({
      targets: ["#image"],
      threshold: 0.25
    })
  )(LitElement)
  implements IImage {
  static styles = [style];
  protected _src = "";
  protected loaded = false;
  @property({ type: Boolean }) lazy = false;
  @property({ type: String }) src = "";
  @property({ type: String }) alt = "";
  @property({ type: Number }) height;
  @property({ type: Number }) width;
  @property({ type: Boolean }) adapt = true;
  @query("img") element;
  render() {
    if (!this._src && !this.lazy && this.src) {
      this._src = this.src;
    }
    let narrow = this.adapt && this.clientWidth > this.clientHeight;
    return html`
      <slot
        id="placeholder"
        name="placeholder"
        aria-hidden=${!!this.loaded}
        ?hidden=${!!this.loaded}
      ></slot>
      <img
        src=${ifDefined(this._src)}
        alt=${ifDefined(this.alt)}
        width=${ifDefined(this.width)}
        height=${ifDefined(this.height)}
        @load=${this.onLoad}
        aria-hidden=${!this.loaded}
        ?narrow=${narrow}
        ?hidden=${!this.loaded}
        id="image"
      />
    `;
  }
  onLoad() {
    this.loaded = true;
    this.requestUpdate();
  }
  intersectionCallback(entries) {
    if (entries.some(({ isIntersecting }) => isIntersecting)) {
      if (this.lazy && this.src) {
        this._src = this.src;
        this.intersectionObserver!.unobserve!(this.element);
        this.requestUpdate();
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "neo-image": Image;
  }
}
