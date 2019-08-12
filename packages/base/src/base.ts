// export * from "./deku";
export * from "./mixer";
export * from "./util";
export * from "./deku";
import { LitElement } from "lit-element";

interface BaseElement {}

//implement global base element
export class MagicCarpet extends LitElement implements BaseElement {}
