// /// <reference path="../../globals.d.ts"/>

// import { LitElement } from "lit-element";

// // From the TC39 Decorators proposal
// interface ClassDescriptor {
//   kind: "class";
//   elements: ClassElement[];
//   finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
// }

// // From the TC39 Decorators proposal
// interface ClassElement {
//   kind: "field" | "method";
//   key: PropertyKey;
//   placement: "static" | "prototype" | "own";
//   initializer?: Function;
//   extras?: ClassElement[];
//   finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
//   descriptor?: PropertyDescriptor;
// }

// function standardIntersection(
//   { root, rootMargin, threshold, targets },
//   descriptor: ClassDescriptor = { kind: "class", elements: [] }
// ) {
//   let { elements = [], kind = "class" } = descriptor;
//   return {
//     kind,
//     initializer(this: IntersectionWatcher) {
//       this._intersection = function(entries, observer) {
//         if (this.intersection) this.intersection(entries, observer);
//       };
//       this.intersectionObserver = new IntersectionObserver(this._intersection, {
//         root: root ? document.querySelector(root) : root,
//         rootMargin,
//         threshold
//       });
//     },
//     elements: elements.concat([
//       {
//         kind: "method",
//         placement: "prototype",
//         descriptor: {
//           value(this: IntersectionWatcher & LitElement) {
//             for (let target of targets) {
//               this.intersectionObserver.observe(
//                 (target && this.renderRoot.querySelector(target)) || this
//               );
//             }
//           }
//         },
//         key: "firstUpdated"
//       },
//       {
//         kind: "method",
//         placement: "prototype",
//         descriptor: {
//           value(this: IntersectionWatcher & LitElement) {
//             if (super.disconnectedCallback) super.disconnectedCallback();
//             for (let target of targets) {
//               this.intersectionObserver.unobserve(
//                 (target && this.renderRoot.querySelector(target)) || this
//               );
//             }
//           }
//         },
//         key: "disconnectedCallback"
//       }
//     ])
//   };
// }

// function legacyIntersection({ root, rootMargin, threshold, targets }, klass) {
//   return class extends klass {
//     intersectionObserver: IntersectionObserver;
//     protected _intersection() {
//       if (this.intersection) this.intersection(...arguments);
//     }
//     constructor() {
//       super();
//       this.intersectionObserver = new IntersectionObserver(this._intersection, {
//         root: root ? document.querySelector(root) : root,
//         rootMargin,
//         threshold
//       });
//     }
//     firstUpdated() {
//       for (let target of targets) {
//         this.intersectionObserver.observe(
//           (target && this.renderRoot.querySelector(target)) || this
//         );
//       }
//     }
//     disconnectedCallback() {
//       if (super.disconnectedCallback) super.disconnectedCallback();
//       for (let target of targets) {
//         this.intersectionObserver.unobserve(
//           (target && this.renderRoot.querySelector(target)) || this
//         );
//       }
//     }
//   } as any;
// }

// export function intersection({
//   root = null,
//   targets = [null],
//   rootMargin = "0px",
//   threshold = 0
// }: IntersectionObserverOptions = {}) {
//   return (
//     classOrDescriptor: Constructor<HTMLElement> | ClassDescriptor
//   ): any => {
//     return typeof (typeof classOrDescriptor === "function"
//       ? legacyIntersection
//       : standardIntersection)(
//       {
//         root,
//         rootMargin,
//         threshold,
//         targets
//       },
//       classOrDescriptor
//     );
//   };
// }
