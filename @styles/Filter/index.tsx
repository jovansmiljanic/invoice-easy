// Vendors
import styled, { css } from "styled-components";

export const Filter = styled.div`
  cursor: pointer;
  outline: 0;
  -webkit-appearance: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  margin: 0 5px;
  min-height: 46px;
  max-height: 46px;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      min-height: 50px;
      max-height: 50px;
      flex: 0 0 100%;
      margin: 0;
    }
  `}
`;

export const Label = styled.div<{ active?: boolean }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  min-width: 240px;

  span {
    font-size: 14px;
    display: flex;
  }

  &:active {
    transform: scale(0.99) translateY(2px);
  }

  ${({ active, theme: { colors, breakpoints, font } }) => css`
    border-radius: 5px;
    padding: 5px 20px;
    color: ${colors.textColor};
    border: 1px solid ${colors.lightGray};

    &:hover {
      background-color: ${colors.hoverGray};
    }

    @media (max-width: ${breakpoints.sm}px) {
      min-width: 0;
      width: 100%;

      span {
        padding-right: 20px;
      }
    }

    ${active &&
    css`
      border-color: ${colors.secondary};

      span {
        font-weight: ${font.weight.semiBold};
        color: ${colors.secondary};
      }

      svg {
        path {
          stroke: ${colors.secondary};
        }
      }
    `}
  `}
`;
