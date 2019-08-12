import { configure, addDecorator } from "@storybook/polymer";
import { withA11y } from "@storybook/addon-a11y";
import globalVars from "../packages/styles/src/variables.scss";
import { html } from "lit-html";
import { unsafeCSS } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { maps } from "../credentials";
// import '@storybook/addon-console';

const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

window.googleMapsLoaded = new Promise(resolve => {
  if (window.google) resolve();
  let script = document.createElement("script");
  script.onload = resolve;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${maps}`;
  document.head.appendChild(script);
});

addDecorator(story => {
  return html`
    <style>
      ${unsafeCSS(globalVars)}
    </style>
    ${story()}
  `;
});

addDecorator(withA11y);
configure(loadStories, module);
