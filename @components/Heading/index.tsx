"use client";

// Vendors
import styled, { css } from "styled-components";

// Global types
import {
  PaddingTypes,
  FontWeights,
  Colors,
  TextAlign,
  Breakpoints,
  Spaces,
} from "@types";

interface HeadingProps {
  weight?: FontWeights;
  padding?: PaddingTypes;
  textAlign?: Partial<Record<Breakpoints, TextAlign>>;
  color?: Colors;
}

const generatePaddingStyles = (
  padding: PaddingTypes,
  breakpoints: Record<Breakpoints, number>,
  spaces: Record<Spaces, number>
) => {
  return Object.entries(padding).map(([breakpoint, spaceTypes]) => {
    const breakpointSize = breakpoints[breakpoint as Breakpoints];
    return css`
      @media (${breakpoint === "sm"
          ? "max"
          : "min"}-width: ${breakpointSize}px) {
        ${Object.entries(spaceTypes)
          .map(
            ([direction, space]) =>
              `padding-${direction}: ${spaces[space as Spaces]}px;`
          )
          .join(" ")}
      }
    `;
  });
};

const generateTextAlignStyles = (
  textAlign: Partial<Record<Breakpoints, TextAlign>>,
  breakpoints: Record<Breakpoints, number>
) => {
  return Object.entries(textAlign).map(([breakpoint, align]) => {
    const breakpointSize = breakpoints[breakpoint as Breakpoints];
    return css`
      @media (${breakpoint === "sm"
          ? "max"
          : "min"}-width: ${breakpointSize}px) {
        text-align: ${align};
      }
    `;
  });
};

const Heading = styled.h1<HeadingProps>`
  ${({
    weight,
    color,
    textAlign,
    padding,
    theme: { font, colors, spaces, breakpoints },
  }) => css`
    ${padding && generatePaddingStyles(padding, breakpoints, spaces)}
    ${textAlign && generateTextAlignStyles(textAlign, breakpoints)}
    ${weight && `font-weight: ${font.weight[weight]};`}
    ${color && `color: ${colors[color]};`}
  `}
`;

export { Heading };
