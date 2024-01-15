// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { Dropdown } from "@styles/Dropdown";

// Icons
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import useTranslation from "next-translate/useTranslation";

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <Dropdown>
      <DropdownItem borderBottom>
        <NotificationsNoneOutlinedIcon />

        <Heading
          as="p"
          weight="bold"
          textAlign={{ xs: "left", sm: "left", md: "left" }}
        >
          {t("home:notificationTitle")}
        </Heading>
      </DropdownItem>

      <DropdownItem>
        <Heading as="p">{t("home:notificationContent")}</Heading>
      </DropdownItem>
    </Dropdown>
  );
};

export { index as NotificationDropdown };

const DropdownItem = styled.div<{
  borderBottom?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 15px 25px;

  ${({ borderBottom, theme: { colors } }) => css`
    color: ${colors.textColor};

    ${borderBottom &&
    `
      border-bottom: 1px solid ${colors.lightGray};
    `}
  `}
`;
