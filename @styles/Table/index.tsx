// Vendors
import styled, { css } from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;

  ${({ theme: { colors, breakpoints } }) => css`
    thead {
      border-radius: 5px;
      color: ${colors.textColor};
      background-color: ${colors.white};
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

      tr {
        th {
          text-align: left;
          padding: 15px;
          font-weight: 700;

          &:last-child {
            text-align: right;
          }

          @media (max-width: ${breakpoints.md}px) {
            &:last-child {
              text-align: left;
            }
          }
        }
      }
    }

    tbody {
      tr {
        background-color: ${colors.white};

        &:hover {
          background-color: ${colors.hoverGray};
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }

        td {
          padding: 15px;
          text-align: left;

          &:last-child {
            text-align: right;
          }
        }
      }
    }

    @media (max-width: ${breakpoints.md}px) {
      tr {
        display: flex;
        flex-direction: column;
      }
    }
  `}
`;
