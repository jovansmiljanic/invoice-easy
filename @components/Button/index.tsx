// Core
import type { ComponentPropsWithoutRef, ElementType } from "react";

// Theme types
import {
  Colors,
  MarginTypes,
  Spaces as Spacestype,
  Breakpoints as Breakpointstype,
} from "@types";

// Vendors
import { darken, lighten } from "polished";
import styled, { css, keyframes } from "styled-components";

// Animation
const Loading = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const defaultStyle = css`
  border-width: 1px;
  border-style: solid;
  text-decoration: none;
  display: inline-flex;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;
  border-radius: 5px;

  svg {
    margin-right: 7px;
  }
`;

const LoadingButton = styled.div`
  position: relative;
  border-radius: 50%;
  animation: ${Loading} 1s infinite linear;
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-color: #333;
  border-style: solid;
  border-bottom-color: #eee;
  margin-right: 10px;
`;

interface StyledButtonProps {
  isLoading?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  variant?: Colors;
  size?: "small" | "medium" | "large";
  margin?: MarginTypes;
}

const CustomButton = styled.button<StyledButtonProps>`
  ${defaultStyle};
  ${({ theme: { defaults, breakpoints } }) => css`
    padding: ${defaults.gutter / 1.5}rem ${defaults.gutter * 3}rem;
    @media (max-width: ${breakpoints.md}px) {
      padding: ${defaults.gutter / 1.2}rem ${defaults.gutter * 2}rem;
    }
  `}
  ${(p) =>
    p.size === "small" &&
    css`
      ${({ theme: { defaults, breakpoints } }) => css`
        font-size: 14px;
        padding: ${defaults.gutter / 2}rem ${defaults.gutter}rem;
        @media (max-width: ${breakpoints.md}px) {
          padding: ${defaults.gutter / 1.2}rem ${defaults.gutter * 2}rem;
        }
      `}
    `}
  ${(p) =>
    p.size === "medium" &&
    css`
      ${({ theme: { defaults, breakpoints } }) => css`
        padding: ${defaults.gutter / 1.5}rem ${defaults.gutter * 3}rem;
        @media (max-width: ${breakpoints.md}px) {
          padding: ${defaults.gutter / 1.2}rem ${defaults.gutter * 2}rem;
        }
      `}
    `}
  ${(p) =>
    p.size === "large" &&
    css`
      ${({ theme: { defaults, breakpoints } }) => css`
        font-size: 18px;
        padding: ${defaults.gutter / 1}rem ${defaults.gutter * 4}rem;
        @media (max-width: ${breakpoints.md}px) {
          padding: ${defaults.gutter / 1.2}rem ${defaults.gutter * 2}rem;
        }
      `}
    `}
  ${(p) =>
    p.variant &&
    css`
      ${({ theme: { colors, font } }) => css`
        background-color: ${colors[p.variant as Colors]};
        border-color: ${colors[p.variant as Colors]};
        color: ${colors.white};
        font-weight: ${font.weight.semiBold};
      `}
    `}
  &:hover {
    ${(p) =>
      !p.isLoading &&
      !p.disabled &&
      !p.isCompleted &&
      p.variant &&
      css`
        ${({ theme: { colors } }) => `
          background-color: ${darken(0.1, colors[p.variant as Colors])};
        `}
      `}
  }
  &:focus {
    ${(p) =>
      !p.isLoading &&
      !p.disabled &&
      !p.isCompleted &&
      css`
        &:focus-visible {
          outline: none;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
            rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        }
      `}
  }
  &:active {
    ${(p) =>
      !p.isLoading &&
      !p.disabled &&
      !p.isCompleted &&
      p.variant &&
      css`
        ${({ theme: { colors } }) => `
          background-color: ${lighten(0.07, colors[p.variant as Colors])};
        `}
      `}}
  }
  &:disabled {
    cursor: not-allowed;
    background-color: rgb(229, 229, 229);
  }
  ${(p) =>
    p.isLoading &&
    css`
      cursor: wait;
      ${LoadingButton}
    `}
  ${(p) =>
    p.isCompleted &&
    css`
      ${({ theme: { colors } }) => `
        background-color: ${colors.success};
      `}
    `}
    // Dynamic Margin
    ${(p) =>
      p.margin &&
      Object.entries(p.margin).map(
        ([key, val]) =>
          css`
            ${({ theme: { breakpoints, spaces } }) => `
              @media (${key === "sm" ? "max" : "min"}-width: ${
              breakpoints[key as Breakpointstype]
            }px) {
                ${Object.entries(val).reduce((p, [key, val]) => {
                  return p
                    ? `${p}; margin-${key}: ${spaces[val as Spacestype]}px;`
                    : `margin-${key}: ${spaces[val as Spacestype]}px`;
                }, "")}
              }
            `}
          `
      )}   
`;

type ButtonProps<T extends ElementType> = {
  as?: T | keyof JSX.IntrinsicElements;
  isLoading?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  variant?: Colors;
  size?: "small" | "medium" | "large";
  margin?: MarginTypes;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = "button">({
  as,
  isLoading,
  isCompleted,
  variant,
  size,
  margin,
  hasIcon,
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <CustomButton
      as={as}
      isLoading={isLoading}
      variant={variant}
      size={size}
      margin={margin}
      isCompleted={isCompleted}
      {...rest}
    >
      {isLoading && <LoadingButton />}

      {children}
    </CustomButton>
  );
};

export { Button };
