// Core types
import { type FC, useState, useRef, useEffect } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import Link from "next/link";
import { signOut } from "next-auth/react";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icons
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

// Shared utils
import { deleteCookie } from "@utils/shared";

// Vendor types
import type { Session } from "next-auth";

interface User {
  session: Session;
}

const index: FC<User> = ({ session }) => {
  // Translation
  const { t } = useTranslation();

  // Toggle resources dropdown
  const [dropdown, setDropdown] = useState(false);

  // Hide dropdown when clicked outside it's Ref
  const navPopupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navPopupRef.current &&
      !navPopupRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // Function that handles sign out
  const handleSignOut = () => {
    deleteCookie({ name: "user" });

    signOut();
  };

  return (
    <UserModal ref={navPopupRef}>
      <User onClick={() => setDropdown(!dropdown)}>
        <Heading as="h6" weight="semiBold">
          {session.user.firstName.substring(0, 1)}
          {session.user.lastName.substring(0, 1)}
        </Heading>
      </User>

      {dropdown && (
        <Dropdown>
          <DropdownItem>
            <Heading as="h6" weight="bold" textAlign={{ md: "center" }}>
              {session.user.firstName} {session.user.lastName}
            </Heading>
          </DropdownItem>

          <Link href="/my-account">
            <DropdownItem>
              <ManageAccountsOutlinedIcon />

              <Heading as="h6" textAlign={{ md: "left" }}>
                {t("home:myProfile")}
              </Heading>
            </DropdownItem>
          </Link>

          <Link href="/invoice">
            <DropdownItem>
              <ReceiptIcon />

              <Heading as="h6" textAlign={{ md: "left" }}>
                {t("home:invoices")}
              </Heading>
            </DropdownItem>
          </Link>

          <Link href="/clients">
            <DropdownItem>
              <PeopleOutlineIcon />

              <Heading as="h6" textAlign={{ md: "left" }}>
                {t("home:clients")}
              </Heading>
            </DropdownItem>
          </Link>

          <DropdownItem onClick={handleSignOut} borderTop>
            <LogoutOutlinedIcon />

            <Heading as="h6" textAlign={{ md: "left" }}>
              {t("home:signOut")}
            </Heading>
          </DropdownItem>
        </Dropdown>
      )}
    </UserModal>
  );
};

export { index as User };

const UserModal = styled.div`
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 50px;
`;

const User = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${({ theme: { colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.secondary};
  `}
`;

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

const DropdownItem = styled.div<{ borderTop?: boolean }>`
  padding: 15px 25px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ borderTop, theme: { colors } }) => css`
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
  `}
`;
