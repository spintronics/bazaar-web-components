import { storiesOf } from "@storybook/polymer";

import { Slideshow } from "../packages/slideshow/src/slideshow.ts";
import { Hero } from "../packages/layout/src/layout.ts";
import { styleMap } from "lit-html/directives/style-map";
import { html } from "lit-html";
import { getRandomColor } from "./spectacle";

import { Icon } from "../packages/icon/src/icon.ts";

storiesOf("slideshow", module).add("hero", () => {
  return html`
    <style>
      abu-slideshow {
        height: 100%;
      }
      #root,
      #root-inner {
        height: 100%;
      }
    </style>
    <abu-slideshow>
      ${Array(7)
        .fill(0)
        .map((_, dex) => {
          return html`
            <style>
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: black;
            </style>
            <abu-hero
              slot=${dex}
              class="slide"
              style=${styleMap({
                background: getRandomColor(),
                backgroundImage: `url(https://picsum.photos/1200/300?${dex})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
              })}
            >
              <h1 slot="head">
                It's about making placeholder text great again
              </h1>
              <p>
                Secure this area until the alert is canceled. Give me regular
                reports. Do you know what's going on? Maybe it's another drill.
                What was that? Oh, it's nothing. Don't worry about it.
              </p>
            </abu-hero>
          `;
        })}
      <button slot="next">next</button>
      <button slot="previous">previous</button>
    </abu-slideshow>
  `;
});
