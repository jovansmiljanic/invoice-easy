// Vendors
import styled, { css } from "styled-components";

export const Dropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 100;

  border-radius: 5px;
  min-width: 200px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};

    &::before {
      content: "";
      position: absolute;
      top: -10px;
      right: 13px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid ${colors.background};
    }
  `}
`;
