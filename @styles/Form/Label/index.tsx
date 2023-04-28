// Vendors
import styled, { css } from "styled-components";

type Label = {};

export const Label = styled.label<Label>`
  flex: 0 0 100%;
  cursor: pointer;
  font-size: 14px;

  ${({ theme: { defaults, font, colors } }) => css`
    font-weight: ${font.weight.medium};
    color: ${colors.black};
    margin-bottom: ${defaults.gutter / 4}px;
  `}
`;
