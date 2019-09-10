import { text, color, withKnobs } from "@storybook/addon-knobs";
import { html, unsafeCSS } from "lit-element";
import { storiesOf } from "@storybook/polymer";
import { ifDefined } from "lit-html/directives/if-defined";
import { classMap } from "lit-html/directives/class-map";
import tinycolor from "tinycolor2";

import { Button } from "../packages/button/src/button.ts";
import { styleMap } from "lit-html/directives/style-map";

storiesOf("button", module)
  .addDecorator(withKnobs)
  .add("material", () => {
    let colorStyle = (color, inverted) => {
      return inverted
        ? {
            "--button-color": `var(--white)`,
            "--button-color--hover": `var(--color-${color})`,
            "--button-color--active": `var(--color-${color})`,
            "--button-background": `var(--color-${color})`,
            "--button-background--active": `var(--white)`,
            "--button-background--hover": `var(--white)`
          }
        : {
            "--button-color": `var(--color-${color})`,
            "--button-background--hover": `var(--color-${color})`,
            "--button-background--active": `var(--color-${color})`
          };
    };

    let colors = ["primary", "success", "info", "link", "warning", "danger"];
    let types = ["unelevated", "raised", "dense", "disabled", "outlined"];

    let icon = {
      warning: "warning",
      info: "info",
      link: "link",
      danger: "error",
      success: "check"
    };

    return html`
      <style>
        .wide {
          width: 250px;
        }
      </style>
      <table>
        <tbody>
          ${types.map((type, dex) => {
            return html`
              <tr>
                ${colors.map((color, x) => {
                  return html`
                    <td>
                      <neo-button
                        ?unelevated=${type === "unelevated"}
                        ?raised=${type === "raised"}
                        ?dense=${type === "dense"}
                        ?disabled=${type === "disabled"}
                        ?outlined=${type === "outlined"}
                        ?wide=${type === "wide"}
                        ?trailingIcon=${!(dex % 2)}
                        class=${classMap({
                          wide: x % 2
                        })}
                        icon=${ifDefined(icon[color])}
                        style=${styleMap(
                          colorStyle(color, type === "unelevated")
                        )}
                        label=${color}
                      >
                      </neo-button>
                    </td>
                  `;
                })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  })
  .add("web", () => {
    return html``;
  })
  .add("ios", () => {
    return html``;
  });
