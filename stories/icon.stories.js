import { storiesOf } from "@storybook/polymer";
import { withKnobs, color, text, select } from "@storybook/addon-knobs";
import { html } from "lit-html";
import {
  getRandomColor,
  injectExternalScript,
  injectStylesheet
} from "./spectacle";

import "../packages/icon/src/icon";
import { injectIconFont, IconFamilies } from "../packages/icon/src/icon";
import { classMap } from "lit-html/directives/class-map";

injectExternalScript(IconFamilies.awesome);
injectIconFont(IconFamilies.material);

storiesOf("icon", module)
  .addDecorator(withKnobs)
  .add("material", () => {
    return html`
      <style>
        abu-icon {
          color: ${color("color", getRandomColor())};
          font-size: ${text("size", "24px")};
        }
      </style>
      <abu-icon>account_circle</abu-icon>
      <abu-icon>search</abu-icon>
      <abu-icon>shopping_cart</abu-icon>
      <abu-icon>check</abu-icon>
      <abu-icon>menu</abu-icon>
      <abu-icon>close</abu-icon>
      <abu-icon>expand_more</abu-icon>
      <abu-icon>help</abu-icon>
      <abu-icon>add_circle</abu-icon>
      <abu-icon>share</abu-icon>
    `;
  })
  .add("font awesome", () => {
    return html`
      <style>
        abu-icon {
          color: ${color("color", getRandomColor())};
          font-size: ${text("size", "24px")};
        }
      </style>
      <abu-icon class="fas fa-user-circle"></abu-icon>
      <abu-icon class="fas fa-search"></abu-icon>
      <abu-icon class="fas fa-shopping-cart"></abu-icon>
      <abu-icon class="fas fa-check"></abu-icon>
      <abu-icon class="fas fa-bars"></abu-icon>
      <abu-icon class="fas fa-times"></abu-icon>
      <abu-icon class="fas fa-chevron-up"></abu-icon>
      <abu-icon class="fas fa-info-circle"></abu-icon>
      <abu-icon class="fas fa-plus-circle"></abu-icon>
      <abu-icon class="fas fa-share"></abu-icon>
    `;
  })
  .add("ion", () => {
    let platform = select("md", { Material: "md", Ios: "ios" }, "md");
    let icon = name =>
      classMap({
        icon: true,
        [`ion-${platform}-${name}`]: true
      });
    return html`
      <script src=${IconFamilies.ionic}></script>
      <style>
        abu-icon {
          color: ${color("color", getRandomColor())};
          font-size: ${text("size", "24px")};
        }
      </style>
      <abu-icon class=${icon("contact")}></abu-icon>
      <abu-icon class=${icon("")}></abu-icon>
    `;
  });
