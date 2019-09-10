import { css } from "lit-element";

export const overlay = (offset = 0) => css`
  bottom: ${offset}px;
  top: ${offset}px;
  left: ${offset}px;
  right: ${offset}px;
  position: absolute;
`;
