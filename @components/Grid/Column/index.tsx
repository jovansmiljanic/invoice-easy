// Core
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global types
import { Breakpoints as Breakpointstype } from "@types";
import { Boolean as Booleantype } from "@types";
import { Spaces as Spacestype } from "@types";
import { ColumnSize as ColumnSizetype } from "@types";
import { TextAlign as TextAligntype } from "@types";
import { PaddingTypes } from "@types";

interface Breakpoints {
  xs?: Spacestype;
  sm?: Spacestype;
  md?: Spacestype;
  lg?: Spacestype;
  xl?: Spacestype;
}

interface TextAlign {
  xs?: TextAligntype;
  sm?: TextAligntype;
  md?: TextAligntype;
  lg?: TextAligntype;
  xl?: TextAligntype;
}

interface Responsivity {
  xs?: ColumnSizetype;
  sm?: ColumnSizetype;
  md?: ColumnSizetype;
  lg?: ColumnSizetype;
  xl?: ColumnSizetype;
}

interface Props {
  padding?: PaddingTypes;
  responsivity: Responsivity;
  order?: Breakpoints;
  center?: Booleantype;
  textAlign?: TextAlign;
  children?: React.ReactNode;
}

const Column = styled.div<Props>`
  ${({
    padding,
    center,
    responsivity,
    textAlign,
    order,
    theme: { breakpoints, defaults, spaces },
  }) => css`
    padding-left: ${defaults.gutter}rem;
    padding-right: ${defaults.gutter}rem;
    flex: 1;

    // Margin auto alignment
    ${center &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}

    // Default
    ${responsivity &&
    !responsivity.sm &&
    `@media (max-width: ${breakpoints.sm}px) {
      flex: 0 0 100%;
    }`}

    // Dynamic text
    ${textAlign &&
    Object.entries(textAlign).map(
      ([key, val]: [string, TextAlign]) =>
        `
        @media (${key === "sm" ? "max" : "min"}-width: ${
          breakpoints[key as Breakpointstype]
        }px) {
          text-align: ${val};
        }
      `
    )}

    // Dynamic order
    ${order &&
    Object.entries(order).map(
      ([key, val]) =>
        `
        @media (${key === "sm" ? "max" : "min"}-width: ${
          breakpoints[key as Breakpointstype]
        }px) {
          order: ${val};
        }
      `
    )}

    // Dynamic padding
    ${padding &&
    Object.entries(padding).map(
      ([key, val]) =>
        `
        @media (${key === "sm" ? "max" : "min"}-width: ${
          breakpoints[key as Breakpointstype]
        }px) {
          ${Object.entries(val).reduce((p, [key, val]) => {
            return p
              ? `${p}; padding-${key}: ${spaces[val as Spacestype]}px;`
              : `padding-${key}: ${spaces[val as Spacestype]}px`;
          }, "")}
        }
            `
    )}

    // Dynamic responsivity
    ${responsivity &&
    Object.entries(responsivity).map(
      ([key, val]) =>
        `
        @media (${key === "sm" ? "max" : "min"}-width: ${
          breakpoints[key as Breakpointstype]
        }px) {
          ${
            val === "hidden"
              ? `display: none;`
              : val
              ? `flex: 0 0 ${(val / 12) * 100}%;`
              : `flex: 1;`
          }
        }
      `
    )}
  `}
`;

const index: FC<Props> = ({ children, ...props }) => {
  return <Column {...props}>{children}</Column>;
};

export default index;
