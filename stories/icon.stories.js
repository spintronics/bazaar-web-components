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
        neo-icon {
          color: ${color("color", getRandomColor())};
          font-size: ${text("size", "24px")};
        }
      </style>
      <neo-icon>account_circle</neo-icon>
      <neo-icon>search</neo-icon>
      <neo-icon>shopping_cart</neo-icon>
      <neo-icon>check</neo-icon>
      <neo-icon>menu</neo-icon>
      <neo-icon>close</neo-icon>
      <neo-icon>expand_more</neo-icon>
      <neo-icon>help</neo-icon>
      <neo-icon>add_circle</neo-icon>
      <neo-icon>share</neo-icon>
    `;
  })
  .add("font awesome", () => {
    return html`
      <style>
        neo-icon {
          color: ${color("color", getRandomColor())};
          font-size: ${text("size", "24px")};
        }
      </style>
      <neo-icon class="fas fa-user-circle"></neo-icon>
      <neo-icon class="fas fa-search"></neo-icon>
      <neo-icon class="fas fa-shopping-cart"></neo-icon>
      <neo-icon class="fas fa-check"></neo-icon>
      <neo-icon class="fas fa-bars"></neo-icon>
      <neo-icon class="fas fa-times"></neo-icon>
      <neo-icon class="fas fa-chevron-up"></neo-icon>
      <neo-icon class="fas fa-info-circle"></neo-icon>
      <neo-icon class="fas fa-plus-circle"></neo-icon>
      <neo-icon class="fas fa-share"></neo-icon>
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
        neo-icon {
          color: ${color("color", getRandomColor())};
          font-size: ${text("size", "24px")};
        }
      </style>
      <neo-icon class=${icon("contact")}></neo-icon>
      <neo-icon class=${icon("")}></neo-icon>
    `;
  });
