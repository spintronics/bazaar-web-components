// export * from "./deku";
export * from "./mixer";
export * from "./util";
import { LitElement } from "lit-element";

interface BaseElement {}

//implement global base element
export class MagicCarpet extends LitElement implements BaseElement {}
