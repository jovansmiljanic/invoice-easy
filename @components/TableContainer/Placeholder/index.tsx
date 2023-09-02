// Core types
import { type FC, useContext } from "react";

// Vendors
import styled, { keyframes, css } from "styled-components";

import { GridContext } from "..";

// Create the keyframes
const animate = keyframes`
    0% {
        background-position: -600px 0
    }
    100% {
        background-position: 600px 0
    }
`;

export const Animation = styled.div`
  background: #f6f7f8;
  background: linear-gradient(to right, #cccccc 20%, #aaaaaa 30%, #888888 95%);
  background-size: 1200px 104px;
  position: relative;
  animation-timing-function: linear;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  width: 100%;
  height: 100%;
  animation-name: ${animate};
`;

const Table = styled.table`
  width: 100%;

  thead {
    height: 41px;
  }

  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.lightGray};
  `}
`;

const TableCell = styled.td`
  padding: 8px;
  height: 45px;
`;

interface Placeholder {
  items?: string[];
}

const index: FC<Placeholder> = ({ items }) => {
  const { limit } = useContext(GridContext);
  const arrayOfLengt = Array.from({ length: limit }, (_, index) => index);

  return (
    <Table>
      <thead></thead>

      <tbody>
        {arrayOfLengt.map((_, i) => (
          <tr key={i}>
            {items?.map((item, i) => (
              <TableCell>
                <Animation />
              </TableCell>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export { index as Placeholder };
