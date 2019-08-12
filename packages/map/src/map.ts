/// <reference path="../../globals.d.ts" />
/// <reference path="../node_modules/@types/googlemaps/index.d.ts" />

// import { bazaarElement } from "@bazaar/base";
import { LitElement, property, customElement } from "lit-element";

/**
 * TODO:
 * implement search actions / markers (fit-map) / pop-over
 */

@customElement("abu-map")
export class Map extends LitElement {
  private static initialized = false;
  private map;
  static style = {
    display: "block",
    height: "100%",
    width: "100%",
    margin: "0 auto"
  };
  constructor() {
    super();
    for (let [key, value] of Object.entries(Map.style)) {
      this.style.setProperty(key, value);
    }
  }
  createRenderRoot() {
    return this;
  }
  static initialize({ googleApiKey = "" }) {
    if (this.initialized) return Promise.resolve();
    if ("google" in window) {
      this.initialized = true;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      if (!googleApiKey) return reject("no api key provided");
      const script = document.createElement("script");

      script.onload = () => {
        this.initialized = true;
        resolve();
      };
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
      document.head.appendChild(script);
    });
  }

  @property({ type: String }) googleApiKey = "";
  @property({ type: Number }) lat = 0;
  @property({ type: Number }) lng = 0;
  @property({ type: Number }) zoom = 0;

  connectedCallback() {
    let { lat, lng, zoom, googleApiKey } = this;
    Map.initialize({ googleApiKey })
      .then(() => {
        this.map = new google.maps.Map(this, {
          center: {
            lat,
            lng
          },
          zoom
        });
        this.dispatchEvent(
          new CustomEvent("map--google:ready", { detail: this.map })
        );
      })
      .catch(error => console.warn("issue loading maps: ", error));
  }
  //   private _centerMap() {
  //     try {
  //       if (this.map) {
  //         let { lat, lng } = this;
  //         this.map.setCenter({
  //           lat,
  //           lng
  //         });
  //       }
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   }
}
