// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Icons
import { ThemePicker } from "./ThemePicker";
import { LanguagePicker } from "./LanguagePicker";
import { VisibilityPicker } from "./VisibilityPicker";
import { CurrencyPicker } from "./CurrencyPicker";

// Global styles
import { Dropdown } from "@styles/Dropdown";

const index: FC = () => {
  return (
    <Dropdown>
      <DropdownItem borderBottom>
        <LanguagePicker />
      </DropdownItem>

      <DropdownItem borderBottom>
        <ThemePicker />
      </DropdownItem>

      <DropdownItem borderBottom>
        <VisibilityPicker />
      </DropdownItem>

      <DropdownItem>
        <CurrencyPicker />
      </DropdownItem>
    </Dropdown>
  );
};

export { index as SettingsDropdown };

const DropdownItem = styled.div<{
  borderTop?: boolean;
  borderBottom?: boolean;
}>`
  // padding: 15px 20px;
  border-radius: 5px;

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
