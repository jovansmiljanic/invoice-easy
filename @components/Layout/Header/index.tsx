// Core types
import { type FC, useEffect, useRef, useState, useContext } from "react";

// NextJS
import Link from "next/link";

// Vendors
import { signOut } from "next-auth/react";
import styled, { css } from "styled-components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Global components
import { Heading, Logo } from "@components";

// Client utils
import type { Session } from "next-auth";

// Icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ReceiptIcon from "@mui/icons-material/Receipt";

// Store context
import { StoreContext } from "@context";

const CustomLink = styled.span`
  padding: 0 5px;
  text-decoration: underline;
  font-weight: bold;
  color: initial;
  cursor: pointer;
`;

const UserModal = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-left: 15px;
  cursor: pointer;
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
  top: 105%;
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
  cursor: pointer;
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ borderTop, theme: { colors } }) => css`
    color: ${colors.textColor};

    span {
      flex: 0 0 70%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    h6 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    svg {
      margin-right: 10px;
      margin-left: 20px;

      path {
        fill: ${colors.textColor};
      }
    }

    &:hover {
      background-color: ${colors.hoverGray};
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGray};
    }

    ${borderTop &&
    `
      border-top: 1px solid ${colors.lightGray};
    `}
  `}
`;

const Border = styled.div`
  width: 100%;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    cursor: pointer;
  }
`;

interface Header {
  session?: Session | null;
}

const index: FC<Header> = ({ session }) => {
  // Hide dropdown when clicked outside it's Ref
  const resourcesPopupRef = useRef<HTMLDivElement>(null);

  // Toggle resources dropdown
  const [dropdown, setDropdown] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resourcesPopupRef.current &&
      !resourcesPopupRef.current.contains(event.target as Node)
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

  const { theme, setTheme } = useContext(StoreContext);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Container>
      <Row
        justifyContent={{
          xs: "space-between",
          sm: "space-between",
          md: "space-between",
        }}
        alignItems={{ xs: "center", sm: "center", md: "center" }}
        padding={{
          xs: { top: 2, bottom: 2 },
          sm: { top: 2, bottom: 2 },
          md: { top: 2, bottom: 2 },
        }}
      >
        <Column
          responsivity={{ md: 3, sm: 4 }}
          padding={{ xs: { bottom: 2 }, sm: { bottom: 2 }, md: { bottom: 2 } }}
        >
          <Link href="/">
            <CustomLink>
              <Logo $width="100" $height="50" $color="secondary" />
            </CustomLink>
          </Link>
        </Column>

        <Column
          responsivity={{ md: 9, sm: 4 }}
          textAlign={{ md: "right" }}
          padding={{ xs: { bottom: 2 }, sm: { bottom: 2 }, md: { bottom: 2 } }}
        >
          <Wrap>
            {theme === "light" ? (
              <LightModeIcon onClick={toggleTheme} />
            ) : (
              <DarkModeIcon onClick={toggleTheme} />
            )}

            {session && (
              <UserModal ref={resourcesPopupRef}>
                <User onClick={() => setDropdown(!dropdown)}>
                  <Heading as="h6" weight="semiBold">
                    {session.user.firstName.substring(0, 1)}
                    {session.user.lastName.substring(0, 1)}
                  </Heading>
                </User>

                {dropdown && (
                  <Dropdown>
                    <DropdownItem>
                      <Heading as="h6">
                        {session.user.firstName} {session.user.lastName}
                      </Heading>
                    </DropdownItem>

                    <Link href="/my-account">
                      <DropdownItem>
                        <ManageAccountsOutlinedIcon />

                        <span>My profile</span>
                      </DropdownItem>
                    </Link>

                    <Link href="/invoice">
                      <DropdownItem>
                        <ReceiptIcon />

                        <span>Invoices</span>
                      </DropdownItem>
                    </Link>

                    <Link href="/clients">
                      <DropdownItem>
                        <PeopleOutlineIcon />

                        <span>Clients</span>
                      </DropdownItem>
                    </Link>

                    <DropdownItem onClick={() => signOut()} borderTop>
                      <LogoutOutlinedIcon />

                      <span>Sign out</span>
                    </DropdownItem>
                  </Dropdown>
                )}
              </UserModal>
            )}
          </Wrap>
        </Column>

        <Border />
      </Row>
    </Container>
  );
};

export { index as Header };
