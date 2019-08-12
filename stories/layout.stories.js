import { storiesOf } from "@storybook/polymer";

import { Slideshow } from "../packages/slideshow/src/slideshow.ts";
import { styleMap } from "lit-html/directives/style-map";
import { html } from "lit-html";
import { getRandomColor } from "./spectacle";
import { withKnobs } from "@storybook/addon-knobs";

import { Layout, Section, Hero } from "../packages/layout/src/layout";
import once from "ramda/es/once";
import { setDefaultBreakPoints } from "../packages/layout/src/media";

storiesOf("layout", module)
  .addDecorator(withKnobs)
  .add("container/section/hero", _ => {
    return html`
      <style>
        abu-section {
          border: 1px solid var(--color-light-accent);
        }
        abu-container {
          border: 1px solid var(--color-light-accent);
        }
        abu-hero {
          border: 1px solid var(--color-light);
        }
        body {
          background: var(--color-dark);
          color: var(--color-light);
        }
      </style>
      <abu-media query="(min-width: var(--desktop))" autohide>
        <abu-hero>
          <h1 slot="head">Hero</h1>
          <abu-section>Body</abu-section>
          <span slot="foot">Foot</span>
        </abu-hero>
      </abu-media>
      <br />
      <abu-hero>
        <abu-container>
          Container
          <abu-section>
            Section
          </abu-section>
        </abu-container>
      </abu-hero>
    `;
  });
