// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global types
import { Spaces as Spacestype } from "@types";
import { Breakpoints as Breakpointstype } from "@types";
import { AlignItems as AlignItemstype } from "@types";
import { JustifyContent as JustifyContenttype } from "@types";
import { PaddingTypes } from "@types";

interface AlignItems {
  xs?: AlignItemstype;
  sm?: AlignItemstype;
  md?: AlignItemstype;
  lg?: AlignItemstype;
  xl?: AlignItemstype;
}

interface JustifyContent {
  xs?: JustifyContenttype;
  sm?: JustifyContenttype;
  md?: JustifyContenttype;
  lg?: JustifyContenttype;
  xl?: JustifyContenttype;
}

interface Row {
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  padding?: PaddingTypes;
  children: React.ReactNode;
}

const Row = styled.div<Row>`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;

  ${({
    padding,
    alignItems,
    justifyContent,
    theme: { breakpoints, spaces, defaults },
  }) => css`
    margin-left: -${defaults.gutter}rem;
    margin-right: -${defaults.gutter}rem;

    // Dynamic alignment
    ${alignItems &&
    Object.entries(alignItems).map(
      ([key, val]) =>
        `
          @media (${key === "sm" ? "max" : "min"}-width: ${
          breakpoints[key as Breakpointstype]
        }px) {
            align-items: ${val};
          }
        `
    )}

    // Dynamic alignment
    ${justifyContent &&
    Object.entries(justifyContent).map(
      ([key, val]) =>
        `
          @media (${key === "sm" ? "max" : "min"}-width: ${
          breakpoints[key as Breakpointstype]
        }px) {
            justify-content: ${val};
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
  `}
`;

const index: FC<Row> = ({ alignItems, justifyContent, children, ...props }) => {
  return (
    <Row {...props} justifyContent={justifyContent} alignItems={alignItems}>
      {children}
    </Row>
  );
};

export default index;
