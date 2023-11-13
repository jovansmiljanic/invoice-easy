// Core types
import type { FC } from "react";

// Nextjs
import { signOut } from "next-auth/react";

// Nextjs types
import type { Session } from "next-auth";

// Global components
import { Heading } from "@components";

// Vendors
import Link from "next/link";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icons
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

interface Dropdown {
  session: Session;
}

const index: FC<Dropdown> = ({ session }) => {
  // Translation
  const { t } = useTranslation();

  return (
    <Dropdown>
      <DropdownItem borderBottom>
        <Heading as="h6" weight="bold" textAlign={{ md: "center" }}>
          {session.user.firstName} {session.user.lastName}
        </Heading>
      </DropdownItem>

      <Link href="/my-account">
        <DropdownItem>
          <ManageAccountsOutlinedIcon />

          <Heading as="h6" textAlign={{ xs: "left", sm: "left", md: "left" }}>
            {t("home:myProfile")}
          </Heading>
        </DropdownItem>
      </Link>

      <Link href="/invoice">
        <DropdownItem>
          <ReceiptIcon />

          <Heading as="h6" textAlign={{ xs: "left", sm: "left", md: "left" }}>
            {t("home:invoices")}
          </Heading>
        </DropdownItem>
      </Link>

      <Link href="/clients">
        <DropdownItem>
          <PeopleOutlineIcon />

          <Heading as="h6" textAlign={{ xs: "left", sm: "left", md: "left" }}>
            {t("home:clients")}
          </Heading>
        </DropdownItem>
      </Link>

      <DropdownItem onClick={() => signOut()} borderTop>
        <LogoutOutlinedIcon />

        <Heading as="h6" textAlign={{ xs: "left", sm: "left", md: "left" }}>
          {t("home:signOut")}
        </Heading>
      </DropdownItem>
    </Dropdown>
  );
};

export { index as UserDropdown };

const Dropdown = styled.div`
  position: absolute;
  top: 115%;
  right: 0;
  z-index: 100;

  border-radius: 5px;
  min-width: 200px;
  text-align: center;
  box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);

  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};
  `}
`;

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

    h6 {
      width: 100%;
    }

    svg {
      margin-right: 10px;

      path {
        fill: ${colors.textColor};
      }
    }

    &:hover {
      background-color: ${colors.hoverGray};
    }

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
