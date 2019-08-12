import { storiesOf } from "@storybook/polymer/dist/client/preview";
import { withKnobs } from "@storybook/addon-knobs";
import { Map } from "../packages/map/src/map.ts";
import { html } from "lit-html";
import { maps } from "../credentials";

window.googleMapsLoaded.then(_ => {
  storiesOf("map", module)
    .addDecorator(withKnobs)
    .add("google", _ => {
      return html`
        <style>
          #root,
          #root-inner {
            height: 100%;
          }
        </style>
        <abu-map googleApiKey=${maps} lat="30" lng="-100" zoom="2"> </abu-map>
      `;
    });
});
