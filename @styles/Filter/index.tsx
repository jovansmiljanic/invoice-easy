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

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.sm}px) {
      min-height: 60px;
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
  margin: 7.5px 0;

  span {
    padding-right: 80px;
    font-size: 14px;
  }

  &:active {
    transform: scale(0.99) translateY(2px);
  }

  ${({ active, theme: { colors, breakpoints, font } }) => css`
    border: 1px solid ${colors.gray};
    border-radius: 5px;
    padding: 5px 20px;
    color: ${colors.gray};

    &:hover {
      background-color: #e1e1e1;
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
      border-color: ${colors.primary};

      span {
        font-weight: ${font.weight.semiBold};
        color: ${colors.primary};
      }

      svg {
        path {
          stroke: ${colors.primary};
        }
      }
    `}
  `}
`;
