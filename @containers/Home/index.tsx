// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const Home = styled.div`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

const index: FC = () => {
  return <Home>Heelo from home</Home>;
};

export { index as Home };
