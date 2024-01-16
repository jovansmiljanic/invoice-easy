// Core types
import { type FC } from "react";

// Vendors
import styled, { keyframes } from "styled-components";

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
  background: #f8f8f8; /* Intermediate solid color fallback */
  background: linear-gradient(to right, #e8e8e8 20%, #d8d8d8 30%, #c8c8c8 95%);

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

const Table = styled.div`
  width: 100%;
`;

const Item = styled.div`
  height: 45px;
  margin-bottom: 10px;
`;

const index: FC = () => {
  const arrayOfLengt = Array.from({ length: 12 }, (_, index) => index);

  return (
    <Table>
      {arrayOfLengt.map((_, i) => (
        <Item key={i}>
          <Animation />
        </Item>
      ))}
    </Table>
  );
};

export { index as Placeholder };
