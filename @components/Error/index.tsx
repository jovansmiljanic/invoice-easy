// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const ErrorWrap = styled.div`
  width: 100%;
  font-size: 12px;
  padding: 0 5px;

  ${({ theme: { colors, font } }) => css`
    color: ${colors.danger};
    font-weight: ${font.weight.semiBold};
  `}
`;

interface ErrorWrap {
  children: React.ReactNode;
}

const index: FC<ErrorWrap> = ({ children }) => {
  return <ErrorWrap>{children}</ErrorWrap>;
};

export { index as ErrorWrap };
