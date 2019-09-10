import {
  LitElement,
  css,
  unsafeCSS,
  html,
  property,
  customElement
} from "lit-element";
import { overlay } from "@bazaar/styles";
import { intent$ } from "@bazaar/base";
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { compose } from "ramda/es";
import flip from "ramda/es/flip";
import propOr from "ramda/es/propOr";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import includes from "ramda/es/includes";

export interface ModalAttributes {
  open: boolean;
  content: string | HTMLElement;
  intentSubscription: Subscription;
}

export enum ModalIntent {
  set_content = "modal:set_content",
  open = "modal:open"
}

/**
 * there should be one modal that has its' content modified
 * to cut down on dom size
 */
@customElement("neo-modal")
export class Modal extends LitElement implements ModalAttributes {
  static styles = [
    css`
      :host {
        display: none;
      }
      :host([open]) {
        ${unsafeCSS(overlay())}
        background-color: var(--backdrop-color, rgba(0,0,0, 0.3));
        display: block;
      }
      .modal {
        align-items: center;
        display: none;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        position: fixed;
        z-index: var(--modal-z, 40);
      }
      :host([open]) .modal {
        display: flex;
      }
      .content {
        margin: 0 auto;
        max-height: calc(100vh - 40px);
        overflow: auto;
        position: relative;
        width: 100%;
      }
      .head,
      .foot {
        align-items: center;
        background-color: var(--modal-background-color, white);
        display: flex;
        flex-shrink: 0;
        justify-content: flex-start;
        padding: var(--modal-padding);
        position: relative;
      }

      .title {
        color: var(--modal-color, black);
        flex-grow: 1;
        flex-shrink: 0;
        font-size: var(--modal-font-size, 1em);
      }

      .body {
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
        padding: var(--modal-padding, 20px);
      }
    `
  ];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) content = "";
  intentSubscription;
  symbol = Symbol();
  constructor() {
    super();
    this.intentSubscription = intent$
      .pipe(
        tap(console.log),
        filter(
          compose(
            flip(includes)([ModalIntent.set_content, ModalIntent.open]),
            propOr("", "type")
          )
        )
      )
      .subscribe({
        next: intent => {
          switch (intent.type) {
            case ModalIntent.set_content:
              this.content = intent.data;
              break;
            case ModalIntent.open:
              this.open = true;
          }
        }
      });
  }
  render() {
    return html`
      <div class="modal">
        <div class="content">
          ${this.content
            ? unsafeHTML(this.content)
            : html`
                <div class="head">
                  <h2 class="title">
                    Model
                  </h2>
                </div>
                <div class="body">
                  <slot></slot>
                </div>
                <div class="foot"></div>
              `}
        </div>
      </div>
    `;
  }
}
