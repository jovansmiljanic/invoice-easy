// Types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global types
import { Colors as Colorstype } from "@types";
import { Boolean as Booleantype } from "@types";
import { Breakpoints as Breakpointstype } from "@types";
import { AlignItems as AlignItemstype } from "@types";
import { JustifyContent as JustifyContenttype } from "@types";

interface JustifyContent {
  xs?: JustifyContenttype;
  sm?: JustifyContenttype;
  md?: JustifyContenttype;
  lg?: JustifyContenttype;
  xl?: JustifyContenttype;
}

interface AlignItems {
  xs?: AlignItemstype;
  sm?: AlignItemstype;
  md?: AlignItemstype;
  lg?: AlignItemstype;
  xl?: AlignItemstype;
}

interface Props {
  fluid?: Booleantype;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  backgroundColor?: Colorstype;
  color?: Colorstype;
  children: React.ReactNode;
  fullHeight?: boolean;
  alignCenter?: boolean;
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  ${({
    alignItems,
    justifyContent,
    fluid,
    theme: { defaults, breakpoints, colors },
  }) => css`
    padding-left: ${defaults.gutter}rem;
    padding-right: ${defaults.gutter}rem;

    ${fluid
      ? `
    max-width: 100%;
    `
      : `    
    @media (min-width: ${breakpoints.md}px) {
      max-width: ${breakpoints.md - 30}px;
    }

    @media (min-width: ${breakpoints.lg}px) {
      max-width: ${breakpoints.lg - 30}px;
    }

    @media (min-width: ${breakpoints.xl}px) {
      max-width: ${breakpoints.xl - 30}px;
    }
    `}

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
  `}
`;

const Wrapper = styled.div<{
  backgroundColor?: Colorstype;
  textColor?: Colorstype;
  fullHeight?: boolean;
  alignCenter?: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;

  ${({
    fullHeight,
    alignCenter,
    backgroundColor,
    textColor,
    theme: { colors },
  }) => `
  ${
    backgroundColor
      ? `
    background-color: ${colors[backgroundColor as Colorstype]};
    `
      : ""
  }

  ${
    textColor
      ? `
      color: ${colors[textColor as Colorstype]};
    `
      : ""
  }

  ${
    fullHeight &&
    `
      min-height: 82vh;
    `
  }

  ${
    alignCenter &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
    `
  }
`}
`;

const index: FC<Props> = ({ color, backgroundColor, children, ...props }) => {
  return (
    <Wrapper
      backgroundColor={backgroundColor ? backgroundColor : undefined}
      textColor={color ? color : undefined}
      {...props}
    >
      <Container
        alignItems={props.alignItems}
        justifyContent={props.justifyContent}
        fluid={props.fluid}
      >
        {children}
      </Container>
    </Wrapper>
  );
};

export default index;
