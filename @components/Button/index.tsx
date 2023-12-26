"use client";

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
  transition: all 0.2s;
  border-radius: 5px;
  justify-content: center;

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

const sizeStyles = {
  small: (defaults: any, breakpoints: any) => css`
    font-size: 14px;
    padding: ${defaults.gutter / 2}rem ${defaults.gutter}rem;
    @media (max-width: ${breakpoints.md}px) {
      padding: ${defaults.gutter / 1.7}rem ${defaults.gutter * 2.2}rem;
    }
  `,
  medium: (defaults: any, breakpoints: any) => css`
    padding: ${defaults.gutter / 1.5}rem ${defaults.gutter * 3}rem;
    @media (max-width: ${breakpoints.md}px) {
      padding: ${defaults.gutter / 1.2}rem ${defaults.gutter * 2}rem;
    }
  `,
  large: (defaults: any, breakpoints: any) => css`
    font-size: 18px;
    padding: ${defaults.gutter / 1}rem ${defaults.gutter * 4}rem;
    @media (max-width: ${breakpoints.md}px) {
      padding: ${defaults.gutter / 1.2}rem ${defaults.gutter * 2}rem;
    }
  `,
};

const CustomButton = styled.button<StyledButtonProps>`
  ${defaultStyle};

  ${({ theme: { defaults, breakpoints } }) => css`
    padding: ${defaults.gutter / 2}rem ${defaults.gutter * 4}rem;
    @media (max-width: ${breakpoints.md}px) {
      padding: ${defaults.gutter / 1.2}rem ${defaults.gutter * 2}rem;
    }
  `}

  ${({ size, theme: { defaults, breakpoints } }) =>
    size && sizeStyles[size](defaults, breakpoints)}

  ${({ variant, theme: { colors, font } }) =>
    variant &&
    css`
      background-color: ${colors[variant]};
      border-color: ${colors[variant]};
      font-weight: ${font.weight.semiBold};
      color: ${variant === "white" ? colors.primary : colors.white};

      &:hover {
        background-color: ${darken(0.1, colors[variant])};
      }

      &:active {
        background-color: ${lighten(0.07, colors[variant])};
      }
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: wait;
      ${LoadingButton}
    `}

  ${({ isCompleted, theme }) =>
    isCompleted &&
    css`
      background-color: ${theme.colors.success};
    `}

  &:disabled {
    cursor: not-allowed;
    background-color: rgb(229, 229, 229);
  }

  ${({ margin, theme }) =>
    margin &&
    Object.entries(margin).map(
      ([key, val]) => css`
        @media (${key === "sm" ? "max" : "min"}-width: ${theme.breakpoints[
            key as Breakpointstype
          ]}px) {
          ${Object.entries(val).reduce((p, [key, val]) => {
            return p
              ? `${p}; margin-${key}: ${theme.spaces[val as Spacestype]}px;`
              : `margin-${key}: ${theme.spaces[val as Spacestype]}px`;
          }, "")}
        }
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

const index = <T extends ElementType = "button">({
  as,
  isLoading,
  isCompleted,
  variant,
  size,
  margin,
  children,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  return (
    <CustomButton
      as={as}
      isLoading={isLoading}
      isCompleted={isCompleted}
      variant={variant}
      size={size}
      margin={margin}
      {...rest}
    >
      {isLoading && <LoadingButton />}
      {children}
    </CustomButton>
  );
};

export { index as Button };
