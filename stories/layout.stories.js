import { storiesOf } from "@storybook/polymer";

import { Slideshow } from "../packages/slideshow/src/slideshow.ts";
import { styleMap } from "lit-html/directives/style-map";
import { html } from "lit-html";
import { getRandomColor } from "./spectacle";
import { withKnobs } from "@storybook/addon-knobs";

import {
  Layout,
  Section,
  Hero,
  Row,
  Card
} from "../packages/layout/src/layout";

storiesOf("layout", module)
  .addDecorator(withKnobs)
  .add("container/section/hero", _ => {
    return html`
      <style>
        neo-section {
          border: 1px solid var(--color-light-accent);
        }
        neo-container {
          border: 1px solid var(--color-light-accent);
        }
        neo-hero {
          border: 1px solid var(--color-light);
        }
        body {
          background: var(--color-dark);
          color: var(--color-light);
        }
      </style>
      <neo-media query="(min-width: var(--desktop))" autohide>
        <neo-hero>
          <h1 slot="head">Hero</h1>
          <neo-section>Body</neo-section>
          <span slot="foot">Foot</span>
        </neo-hero>
      </neo-media>
      <br />
      <neo-hero>
        <neo-container>
          Container
          <neo-section>
            Section
          </neo-section>
        </neo-container>
      </neo-hero>
    `;
  })
  .add("row/card", _ => {
    return html`
      <style>
        neo-row {
          margin-bottom: 1rem;
        }
        body {
          background: var(--color-light);
        }
        neo-container {
          border: 1px solid var(--color-dark-accent);
        }
        neo-card {
          border: 1px solid blue;
        }
      </style>
      <neo-container>
        <neo-row>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                Bounty dance the hempen jig prow booty knave Cat o'nine tails
                sloop sutler marooned lugsail. Barbary Coast haul wind
                hornswaggle scallywag belaying pin scourge of the seven seas ye
                yo-ho-ho jib American Main. Coffer lugger belay bilge water yard
                come about chase bounty topsail deadlights.
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
        </neo-row>
        <neo-row gapless>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                Scuppers splice the main brace bilged on her anchor Cat o'nine
                tails spike barque ahoy cackle fruit sheet dead men tell no
                tales. Swab case shot port keelhaul long clothes piracy to go on
                account quarterdeck Sink me black jack. Aye hail-shot Sink me
                lad bounty clap of thunder mizzen sloop schooner jack.
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
          <div>
            <neo-card>
              <strong slot="header">Header</strong>
              <div slot="content">
                content
              </div>
              <div slot="footer">
                footer
              </div>
            </neo-card>
          </div>
        </neo-row>
      </neo-container>
    `;
  });
