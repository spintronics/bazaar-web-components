import { css, customElement } from "lit-element";
import { LinearProgress } from "@material/mwc-linear-progress";
// import { layout } from '@bazaar/layout';
// import style from './element.style';

/**
 * @cssvar progress-buffer-color
 * @cssvar progress-primary-color
 */
@customElement("neo-progress")
export class Progress extends LinearProgress {
  static get styles() {
    return css`
      ${super.styles}
      .mdc-linear-progress__buffer {
        background-color: var(--progress-buffer-color, #e6e6e6);
      }
      .mdc-linear-progress__bar-inner {
        background-color: var(--progress-primary-color, #6200ee);
      }
      :host {
        width: 100%;
        display: inline-block;
      }
    `;
  }
}
