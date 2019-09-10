import { queryAll, LitElement, html, css, property } from "lit-element";

export type BreadcrumbIntent = "navigate";

export interface Attributes {
  triggerIntent: boolean;
  seperator: string;
}

export default class Breadcrumbs extends LitElement implements Attributes {
  @queryAll("a") links;
  @property({ type: Boolean }) triggerIntent = false;
  @property({ type: String }) seperator = "chevron_right";
  static styles = [
    css`
      neo-icon {
        padding: 0 0.5em;
      }
    `
  ];
  render() {
    return html`
      ${Array.from(this.children).map(_ => {
        return html`
          <slot></slot>
          <neo-icon>${this.seperator}</neo-icon>
        `;
      })}
    `;
  }
  updated() {
    this.links.forEach(
      link =>
        (link.onclick = function(event) {
          let { href } = this;
          event.preventDefault();
          window.dispatchEvent(
            new CustomEvent("navigation", {
              detail: {
                href
              }
            })
          );
        })
    );
  }
}

// <breadcrumbs >
//     <a href="/cart">
//     ...
// </breadcrumbs>
