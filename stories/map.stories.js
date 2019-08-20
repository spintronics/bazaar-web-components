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
        <neo-map
          googleApiKey=${maps}
          lat="30.250102"
          lng="-97.7522387"
          zoom="14"
          markers=${JSON.stringify([
            {
              position: {
                lat: 30.25,
                lng: -97.75
              },
              title: "a"
            },
            {
              position: {
                lat: 30.24,
                lng: -97.74
              },
              title: "b"
            },
            {
              position: {
                lat: 30.26,
                lng: -97.76
              },
              title: "c"
            }
          ])}
        >
        </neo-map>
      `;
    });
});
