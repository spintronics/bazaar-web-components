// import { storiesOf, withKnobs, html } from '@open-wc/demoing-storybook';
import { text, color, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { storiesOf } from "@storybook/polymer";

import { Progress } from "../packages/progress/progress.js";
import { Section } from "../packages/layout/layout.js";
import { styleMap } from "lit-html/directives/style-map";

storiesOf("progress", module)
  .addDecorator(withKnobs)
  .add("linear", () => {
    // let progress = '0.6';
    // let primary = 'rebeccapurple';
    // let buffer = 'grey';
    let progress = text("Progress", "0.6");
    let primary = color("Primary color", "rebeccapurple");
    let buffer = color("Buffer color", "grey");
    let progressStyle = {
      "--progress-primary-color": primary,
      "--progress-buffer-color": buffer
    };

    return html`
      <div>
        <abu-section>
          <abu-progress></abu-progress>
        </abu-section>
        <abu-section>
          <abu-progress
            style=${styleMap(progressStyle)}
            determinate
            progress=${progress}
          ></abu-progress>
        </abu-section>
        <abu-section>
          <abu-progress
            style=${styleMap(progressStyle)}
            determinate
            buffer="0.1"
            progress=${progress}
          ></abu-progress>
        </abu-section>
        <abu-section>
          <abu-progress
            style=${styleMap(progressStyle)}
            determinate
            reverse
            buffer="0.1"
            progress=${progress}
          ></abu-progress>
        </abu-section>
        <abu-section>
          <abu-progress
            style=${styleMap(progressStyle)}
            determinate
            progress=${progress}
          ></abu-progress>
        </abu-section>
        <abu-section>
          <abu-progress
            style=${styleMap(progressStyle)}
            determinate
            reverse
            progress=${progress}
          ></abu-progress>
        </abu-section>
      </div>
    `;
  });
