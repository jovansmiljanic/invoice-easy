// Core types
import { Column, Container, Row } from "@components/Grid";
import type { FC } from "react";

// Vendors
import styled, { keyframes, css } from "styled-components";

// Create the keyframes
const animate = keyframes`
    0%{
        background-position: -600px 0
    }
    100%{
        background-position: 600px 0
    }
`;

const Animation = styled.div`
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
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

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-center;
  align-items: center;

  ${({ theme: { breakpoints, colors } }) => css`
    background-color: ${colors.background};
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const Wrap = styled.div`
  height: 27.5px;
  margin: 10px;

  &:nth-child(1) {
    width: 60px;
    margin-right: 75px;
  }

  &:nth-child(2) {
    width: 150px;
    margin-right: 75px;
  }

  &:nth-child(3) {
    width: 50px;
    margin-right: 170px;
  }

  &:nth-child(4) {
    width: 100px;
    margin-right: 120px;
  }

  &:nth-child(5) {
    width: 60px;
    margin-right: 155px;
  }

  &:nth-child(6) {
    width: 85px;
    margin-right: 145px;
  }

  &:nth-child(7) {
    width: 40px;
  }
`;

const index: FC = () => {
  const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {a.map((item) => (
        <Wrapper key={item}>
          <Wrap>
            <Animation />
          </Wrap>

          <Wrap>
            <Animation />
          </Wrap>

          <Wrap>
            <Animation />
          </Wrap>

          <Wrap>
            <Animation />
          </Wrap>

          <Wrap>
            <Animation />
          </Wrap>

          <Wrap>
            <Animation />
          </Wrap>

          <Wrap>
            <Animation />
          </Wrap>
        </Wrapper>
      ))}
    </>
  );
};

export { index as TablePlaceholder };
