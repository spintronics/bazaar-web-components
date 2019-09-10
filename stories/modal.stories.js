import { storiesOf } from "@storybook/polymer";

import { ModalIntent } from "../packages/modal/src/modal.ts";
import { broadcast } from "../packages/base/src/util.ts";
import { html } from "lit-element";

storiesOf("modal").add("defaut", _ => {
  return html`
    <button
      @click=${broadcast({
        type: ModalIntent.open
      })}
    >
      open
    </button>
    <neo-modal>model</neo-modal>
  `;
});
