// Vendors
import styled, { css } from "styled-components";

export const Errorgroup = styled.div`
  font-size: 14px;
  padding: 4px 20px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    color: ${colors.white};
    background-color: ${colors.danger};
  `}
`;
