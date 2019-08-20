// import { storiesOf, withKnobs, html } from '@open-wc/demoing-storybook';
import { text, color, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { storiesOf } from "@storybook/polymer";

import { Progress } from "../packages/progress/src/progress.ts";
import { Section } from "../packages/layout/src/layout.ts";
import { styleMap } from "lit-html/directives/style-map";

storiesOf("progress", module)
  .addDecorator(withKnobs)
  .add("linear", () => {
    // let progress = '0.6';
    // let primary = 'rebeccapurple';
    // let buffer = 'grey';
    let progress = text("Progress", "0.6");
    let primary = color("Primary color", "rebeccapurple");
    let buffer = color("Buffer color", "lightgrey");
    let progressStyle = {
      "--progress-primary-color": primary,
      "--progress-buffer-color": buffer
    };

    return html`
      <neo-section style=${styleMap(progressStyle)}>
        <neo-progress></neo-progress>
      </neo-section>
      <neo-section>
        <neo-progress style=${styleMap(progressStyle)} reverse></neo-progress>
      </neo-section>
      <neo-section>
        <neo-progress
          style=${styleMap(progressStyle)}
          determinate
          buffer="1"
          progress=${progress}
        ></neo-progress>
      </neo-section>
      <neo-section>
        <neo-progress
          style=${styleMap(progressStyle)}
          determinate
          buffer="0.7"
          progress=${progress}
        ></neo-progress>
      </neo-section>
      <neo-section>
        <neo-progress
          style=${styleMap(progressStyle)}
          determinate
          buffer="0.7"
          reverse
          progress=${progress}
        ></neo-progress>
      </neo-section>
    `;
  });
