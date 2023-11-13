// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Icons
import { ThemePicker } from "./ThemePicker";
import { VisibilityPicker } from "./VisibilityPicker";
import { Dropdown } from "@styles/Dropdown";

const index: FC = () => {
  return (
    <Dropdown>
      <DropdownItem borderBottom>
        Theme:
        <ThemePicker />
      </DropdownItem>

      <DropdownItem>
        Visibility:
        <VisibilityPicker />
      </DropdownItem>
    </Dropdown>
  );
};

export { index as SettingsDropdown };

const DropdownItem = styled.div<{
  borderTop?: boolean;
  borderBottom?: boolean;
}>`
  padding: 15px 25px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ borderTop, borderBottom, theme: { colors } }) => css`
    color: ${colors.textColor};

    ${borderTop &&
    `
      border-top: 1px solid ${colors.lightGray};
    `}

    ${borderBottom &&
    `
      border-bottom: 1px solid ${colors.lightGray};
    `}
  `}
`;
