import { storiesOf } from "@storybook/polymer";

import { Slideshow } from "../packages/slideshow/src/slideshow.ts";
import { Hero } from "../packages/layout/src/layout.ts";
import { styleMap } from "lit-html/directives/style-map";
import { html } from "lit-html";

storiesOf("slideshow", module).add("default", () => {
  return html`
    <abu-slideshow>
      ${Array(7)
        .fill(0)
        .map((_, dex) => {
          return html`
            <abu-hero
              slot=${dex}
              style=${styleMap({
                background: "var(--color-dark)",
                backgroundImage: "https://picsum.photos/1200/300?" + dex
              })}
            >
              <h1 slot="head">I think you might really like this</h1>
              <p>
                Secure this area until the alert is canceled. Give me regular
                reports. Do you know what's going on? Maybe it's another drill.
                What was that? Oh, it's nothing. Don't worry about it.
              </p>
            </abu-hero>
          `;
        })}
    </abu-slideshow>
  `;
});
