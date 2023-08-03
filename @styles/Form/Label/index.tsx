// Vendors
import styled, { css } from "styled-components";

type Label = {};

export const Label = styled.label<Label>`
  flex: 0 0 100%;
  cursor: pointer;
  font-size: 14px;

  ${({ theme: { defaults, colors } }) => css`
    color: ${colors.textColor};
    margin-bottom: ${defaults.gutter * 4}px;
  `}
`;
