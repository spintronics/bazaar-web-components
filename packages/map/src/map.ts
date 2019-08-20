/// <reference path="../../globals.d.ts" />
/// <reference types="googlemaps" />

import {
  LitElement,
  property,
  // customElement,
  query,
  html,
  css,
  customElement
} from "lit-element";

@customElement("neo-map")
export class NiceMap extends LitElement {
  protected static initialized = false;
  protected map;
  protected _markers: { [key: string]: google.maps.Marker } = {};
  @query("#map") mapElement;
  @property({ type: String }) googleApiKey = "";
  @property({ type: Number }) lat = 0;
  @property({ type: Number }) lng = 0;
  @property({ type: Array }) markers: google.maps.MarkerOptions[] = [];
  @property({ type: Number }) zoom = 0;
  @property({ type: Boolean }) persistMarkers = true;
  static styles = css`
    #map {
      display: block;
      height: 100%;
      width: 100%;
      margin: 0 auto;
    }
  `;

  render() {
    return html`
      <div id="map"></div>
    `;
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

  updated(_) {
    if (!this.persistMarkers) {
      for (let [key, marker] of Object.entries(this._markers)) {
        marker.setMap(null);
        delete this._markers[key];
      }
    }
    if (this.map) {
      this.markers.forEach(marker => {
        let id =
          marker.title ||
          (marker.position && "" + marker.position.lat + marker.position.lng);
        if (id && !this._markers[id]) {
          this._markers[id] = new google.maps.Marker({
            map: this.map,
            ...marker
          });
        }
      });
    }
  }

  firstUpdated() {
    let { lat, lng, zoom, googleApiKey } = this;
    NiceMap.initialize({ googleApiKey })
      .then(() => {
        this.map = new google.maps.Map(this.mapElement, {
          center: {
            lat,
            lng
          },
          zoom
        });
        this.dispatchEvent(
          new CustomEvent("map--google:ready", { detail: this.map })
        );
        this.requestUpdate();
      })
      .catch(error => console.warn("issue loading maps: ", error));
  }

  protected centerMap() {
    try {
      if (this.map) {
        let { lat, lng } = this;
        this.map.setCenter({
          lat,
          lng
        });
      }
    } catch (error) {
      console.warn(error);
    }
  }
}
