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
  margin-right: 30px;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.sm}px) {
      min-width: 0;
      flex: 0 0 50%;
      padding-right: 5px;
      margin: 0;
    }

    @media (max-width: ${breakpoints.xs}px) {
      flex: 0 0 100%;
      padding-right: 5px;
      margin: 0;
    }
  `}
`;

export const Label = styled.div<{ active?: boolean }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  min-width: 260px;
  margin-top: 7.5px;

  span {
    padding-right: 80px;
  }

  &:active {
    transform: scale(0.99) translateY(2px);
  }

  ${({ active, theme: { colors, breakpoints, font } }) => css`
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

    min-height: 45px;
    padding: 5px 20px;
    color: ${colors.textColor};

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
  `}
`;
