// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { Dropdown } from "@styles/Dropdown";

const index: FC = () => {
  return (
    <Dropdown>
      <DropdownItem borderBottom>
        <Heading as="p" textAlign={{ xs: "left", sm: "left", md: "left" }}>
          Notifications
        </Heading>
      </DropdownItem>

      <DropdownItem>
        <Heading as="h6" weight="semiBold">
          No notifications found!
        </Heading>
      </DropdownItem>
    </Dropdown>
  );
};

export { index as NotificationDropdown };

const DropdownItem = styled.div<{
  borderBottom?: boolean;
}>`
  padding: 15px 25px;

  ${({ borderBottom, theme: { colors } }) => css`
    color: ${colors.textColor};

    ${borderBottom &&
    `
      border-bottom: 1px solid ${colors.lightGray};
    `}
  `}
`;
