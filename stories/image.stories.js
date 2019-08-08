import { text, color, withKnobs, boolean } from "@storybook/addon-knobs";
import { html, unsafeCSS } from "lit-element";
import { storiesOf } from "@storybook/polymer";
import { ifDefined } from "lit-html/directives/if-defined";
import { classMap } from "lit-html/directives/class-map";

import { Image } from "../packages/image/src/image.ts";
import { styleMap } from "lit-html/directives/style-map";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { randomString } from "./spectacle";

// const hotName = "abu-image-" + randomString();

// customElements.define(hotName, class extends Image {});

storiesOf("image", module)
  .addDecorator(withKnobs)
  .add("responsive", () => {
    let rounded = boolean("rounded", false);
    let fullwidth = boolean("full-width", false);
    return html`
      <style>
        .container {
          text-align: center;
          resize: both;
          overflow: scroll;
          width: 100%;
          height: 300px;
        }
      </style>
      <div class="container">
        <abu-image
          ?fullwidth=${fullwidth}
          ?rounded=${rounded}
          src="https://picsum.photos/500/300"
        ></abu-image>
      </div>
    `;
  })
  .add("lazy", () => {
    let rounded = boolean("rounded", false);
    let fullwidth = boolean("full-width", false);
    return html`
      <div class="container">
        ${Array(15)
          .fill(0)
          .map((_, x) => {
            return html`
              <abu-image
                ?fullwidth=${fullwidth}
                ?rounded=${rounded}
                src="https://picsum.photos/500/300?${x}"
                style="height: 300px;"
                lazy
              >
                <img
                  slot="placeholder"
                  src="https://via.placeholder.com/500/300"
                  style="width: 500px;"
                />
              </abu-image>
            `;
          })}
      </div>
    `;
  });
