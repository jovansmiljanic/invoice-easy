// Vendors
import styled, { css } from "styled-components";

// Global types
import { Spaces as Spacestype } from "@types";
import { Breakpoints as Breakpointstype } from "@types";
import { Colors as Colorstype } from "@types";
import { FontWeights as FontWeightstype } from "@types";
import { TextAlign as TextAligntype } from "@types";
import { PaddingTypes } from "@types";

interface TextAlign {
  xs?: TextAligntype;
  sm?: TextAligntype;
  md?: TextAligntype;
  lg?: TextAligntype;
  xl?: TextAligntype;
}

interface Heading {
  weight?: FontWeightstype;
  padding?: PaddingTypes;
  textAlign?: TextAlign;
  color?: Colorstype;
}

const Heading = styled.h1<Heading>`
  ${({
    weight,
    color,
    textAlign,
    padding,
    theme: { font, colors, spaces, breakpoints },
  }) => css`
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
  
    ${weight && `font-weight: ${font.weight[weight]};`}
    
    ${color && `color: ${colors[color]};`}
  `}
`;

export { Heading };
