// /// <reference path="../../globals.d.ts"/>
// import { customElement } from "lit-element";
// // import pkg from "../package.json";
// // import { Observable } from "rxjs";
// // import { path } from "ramda/es";

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

// // export const schema = _ => (
// //   classOrDescriptor: ClassDescriptor | Constructor<HTMLElement>
// // ) => {
// //   if (typeof classOrDescriptor === "function") {
// //     return class extends classOrDescriptor {
// //       model: any;
// //       constructor() {
// //         super();
// //         let model = document.getElementById("schema");
// //         if (model) this.model = model;
// //       }
// //     };
// //   } else {
// //     ///
// //     return classOrDescriptor;
// //   }
// // };

// // export const bazaarElement = name => (
// //   classOrDescriptor: ClassDescriptor | Constructor<HTMLElement>
// // ) => {
// //   console.log(pkg.config.element_prefix);
// //   if (!window.customElements.get(pkg.config.element_prefix + name)) {
// //     return classOrDescriptor;
// //   }

// //   // if (typeof classOrDescriptor === "object") {
// //   //   classOrDescriptor.elements.push({
// //   //     kind: "field",
// //   //     placement: "static",
// //   //     key: "name",
// //   //     descriptor: {
// //   //       enumerable: false,
// //   //       configurable: false,
// //   //       value: Constants.element_prefix + name
// //   //     }
// //   //   });
// //   // }
// //   return customElement(pkg.config.element_prefix + name)(classOrDescriptor);
// //   // if (typeof classOrDescriptor === "function") {
// //   //   klass.name = Constants.element_prefix + name;
// //   // }
// //   // return klass;
// // };

// // import { LitElement } from "lit-element";

// // function standardIntersection(
// //   { root, rootMargin, threshold, targets },
// //   descriptor: ClassDescriptor = { kind: "class", elements: [] }
// // ) {
// //   let { elements = [], kind = "class" } = descriptor;
// //   return {
// //     kind,
// //     initializer(this: IIntersectionObserver) {
// //       this._intersection = function(entries, observer) {
// //         if (this.intersection) this.intersection(entries, observer);
// //       };
// //       this.intersectionObserver = new IntersectionObserver(this._intersection, {
// //         root: root ? document.querySelector(root) : root,
// //         rootMargin,
// //         threshold
// //       });
// //     },
// //     elements: elements.concat([
// //       {
// //         kind: "method",
// //         placement: "prototype",
// //         descriptor: {
// //           value(this: IIntersectionObserver & LitElement) {
// //             for (let target of targets) {
// //               this.intersectionObserver.observe(
// //                 (target && this.renderRoot.querySelector(target)) || this
// //               );
// //             }
// //           }
// //         },
// //         key: "firstUpdated"
// //       },
// //       {
// //         kind: "method",
// //         placement: "prototype",
// //         descriptor: {
// //           value(this: IIntersectionObserver & LitElement) {
// //             if (super.disconnectedCallback) super.disconnectedCallback();
// //             for (let target of targets) {
// //               this.intersectionObserver.unobserve(
// //                 (target && this.renderRoot.querySelector(target)) || this
// //               );
// //             }
// //           }
// //         },
// //         key: "disconnectedCallback"
// //       }
// //     ])
// //   };
// // }

// // function legacyIntersection({ root, rootMargin, threshold, targets }, klass) {
// //   return class extends klass {
// //     intersectionObserver: IntersectionObserver;
// //     protected _intersection() {
// //       if (this.intersection) this.intersection(...arguments);
// //     }
// //     constructor() {
// //       super();
// //       this.intersectionObserver = new IntersectionObserver(this._intersection, {
// //         root: root ? document.querySelector(root) : root,
// //         rootMargin,
// //         threshold
// //       });
// //     }
// //     firstUpdated() {
// //       for (let target of targets) {
// //         this.intersectionObserver.observe(
// //           (target && this.renderRoot.querySelector(target)) || this
// //         );
// //       }
// //     }
// //     disconnectedCallback() {
// //       if (super.disconnectedCallback) super.disconnectedCallback();
// //       for (let target of targets) {
// //         this.intersectionObserver.unobserve(
// //           (target && this.renderRoot.querySelector(target)) || this
// //         );
// //       }
// //     }
// //   } as any;
// // }

// // export function intersection({
// //   root = null,
// //   targets = [null],
// //   rootMargin = "0px",
// //   threshold = 0
// // }: IntersectionObserverOptions = {}) {
// //   return (
// //     classOrDescriptor: Constructor<HTMLElement> | ClassDescriptor
// //   ): any => {
// //     return typeof (typeof classOrDescriptor === "function"
// //       ? legacyIntersection
// //       : standardIntersection)(
// //       {
// //         root,
// //         rootMargin,
// //         threshold,
// //         targets
// //       },
// //       classOrDescriptor
// //     );
// //   };
// // }
