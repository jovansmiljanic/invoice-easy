// Core types
import type { FC } from "react";

import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";

const NotFound = styled.div`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface NotFound {}

const index: FC<NotFound> = () => {
  const router = useRouter();

  return <NotFound></NotFound>;
};

export { index as NotFound };
