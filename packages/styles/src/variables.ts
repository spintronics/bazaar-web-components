import { css, unsafeCSS } from "lit-element";
import tinycolor from "tinycolor2";

let dark = tinycolor("rgb(237, 244, 239)");
let darkAccent = tinycolor("rgb(157, 178, 145)");
let primary = tinycolor("rgb(255, 209, 5)");
let lightAccent = tinycolor("rgb(196, 86, 71)");
let light = tinycolor("rgb(47, 79, 81)");

let success = tinycolor("rgb(35, 209, 96)");
let info = tinycolor("rgb(32, 156, 238)");
let link = tinycolor("rgb(50, 115, 220)");
let warning = tinycolor("rgb(255, 221, 87)");
let danger = tinycolor("rgb(255, 56, 96)");

export const variables = css`
  :root {
    --color-dark: ${unsafeCSS(dark.toHexString())};
    --color-dark-accent: ${unsafeCSS(darkAccent.toHexString())};
    --color-primary: ${unsafeCSS(primary.toHexString())};
    --color-light-accent: ${unsafeCSS(lightAccent.toHexString())};
    --color-light: ${unsafeCSS(light.toHexString())};
    --color-success: ${unsafeCSS(
      tinycolor.mix(success, primary, 30).toHexString()
    )};
    --color-info: ${unsafeCSS(tinycolor.mix(info, primary, 30).toHexString())};
    --color-link: ${unsafeCSS(tinycolor.mix(link, primary, 30).toHexString())};
    --color-warning: ${unsafeCSS(
      tinycolor.mix(warning, primary, 30).toHexString()
    )};
    --color-danger: ${unsafeCSS(
      tinycolor.mix(danger, primary, 30).toHexString()
    )};
    --grey-darker: hsl(0, 0%, 21%);
    --grey-dark: hsl(0, 0%, 29%);
    --grey: hsl(0, 0%, 48%);
    --grey-light: hsl(0, 0%, 71%);
    --grey-lighter: hsl(0, 0%, 86%);
    --white: white;
    --black: black;
    --graffiti: #deface;

    --family-sans-serif: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    --family-monospace: monospace;
    --render-mode: optimizeLegibility;
    --size-1: 3rem;
    --size-2: 2.5rem;
    --size-3: 2rem;
    --size-4: 1.5rem;
    --size-5: 1.25rem;
    --size-6: 1rem;
    --size-7: 0.75rem;
    --weight-light: 300;
    --weight-normal: 400;
    --weight-medium: 500;
    --weight-semibold: 600;
    --weight-bold: 700;

    --block-spacing: 1.5rem;
    --gap: 32px;
    --tablet: 769px;
    --desktop: calc(960px + (2 * var(--gap, 32px)));
    --widescreen: calc(1152px + (2 * var(--gap, 32px)));
    --fullhd: calc(1344px + (2 * var(--gap, 32px)));

    --easing: ease-out;
    --radius-small: 2px;
    --radius: 4px;
    --radius-large: 6px;
    --radius-rounded: 290486px;
    --speed: 86ms;
    --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    // --transition: all var(--speed, 86ms) var(--easing, ease-out);

    --container-offset: (2 * var(--gap, 32px));

    --section-padding: 3rem 1.5rem;
    --section-padding-medium: 9rem 1.5rem;
    --section-padding-large: 18rem 1.5rem;

    --text: var(--color-dark);

    @media screen and (max-width: var(--desktop) - 1px) {
      --display-hidden-below-desktop: none;
    }
    @media screen and (max-width: var(--tablet) - 1px) {
      --display-hidden-below-tablet: none;
    }
    @media screen and (min-width: var(--tablet)) {
      --container-width: calc(var(--tablet) - var(--container-offset));
      --display-hidden-tablet: none;
    }
    @media screen and (min-width: var(--desktop)) {
      --container-width: calc(var(--desktop) - var(--container-offset));
      --display-hidden-desktop: none;
    }

    @media screen and (min-width: var(--widescreen)) {
      --container-width: calc(var(--widescreen) - var(--container-offset));
    }

    @media screen and (min-width: var(--fullhd)) {
      --container-width: calc(var(--fullhd) - var(--container-offset));
    }
  }
`;
