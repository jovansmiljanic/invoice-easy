// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icons
import { ThemePicker } from "./ThemePicker";
import { LanguagePicker } from "./LanguagePicker";
import { VisibilityPicker } from "./VisibilityPicker";

// Global styles
import { Dropdown } from "@styles/Dropdown";

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <Dropdown>
      {/* <DropdownItem borderBottom>
        {t("home:theme")}

        <ThemePicker />
      </DropdownItem>

      <DropdownItem borderBottom>
        {t("home:visibility")}

        <VisibilityPicker />
      </DropdownItem> */}

      <DropdownItem>
        <LanguagePicker />
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
