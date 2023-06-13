// Core types
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
    background-color: ${colors.white};
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const Wrap = styled.div`
  height: 20px;
  margin: 10px;

  &:nth-child(1) {
    width: 65px;
    margin-right: 55px;
  }

  &:nth-child(2) {
    width: 75px;
    margin-right: 105px;
  }

  &:nth-child(3) {
    width: 55px;
    margin-right: 95px;
  }

  &:nth-child(4) {
    width: 100px;
    margin-right: 90px;
  }

  &:nth-child(5) {
    width: 85px;
    margin-right: 95px;
  }

  &:nth-child(6) {
    width: 55px;
    margin-right: 132px;
  }

  &:nth-child(7) {
    width: 70px;
    margin-right: 110px;
  }

  &:nth-child(8) {
    width: 70px;
  }
`;

const index: FC = () => {
  return (
    <>
      <Wrapper>
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

        <Wrap>
          <Animation />
        </Wrap>
      </Wrapper>
      <Wrapper>
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

        <Wrap>
          <Animation />
        </Wrap>
      </Wrapper>
      <Wrapper>
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

        <Wrap>
          <Animation />
        </Wrap>
      </Wrapper>
      <Wrapper>
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

        <Wrap>
          <Animation />
        </Wrap>
      </Wrapper>
      <Wrapper>
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

        <Wrap>
          <Animation />
        </Wrap>
      </Wrapper>
      <Wrapper>
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

        <Wrap>
          <Animation />
        </Wrap>
      </Wrapper>
    </>
  );
};

export { index as Placeholder };
