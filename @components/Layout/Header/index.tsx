// Core types
import { type FC, useEffect, useRef, useState } from "react";

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
import { checkCookie } from "@utils/client";
import { CreateInvoice, MyProfile, NewClient, SignOut } from "public/svg";

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
  margin-left: auto;
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
    background-color: ${colors.primary};
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
    color: ${colors.gray};
    background-color: ${colors.white};
  `}
`;

const DropdownItem = styled.div<{ borderTop?: boolean }>`
  cursor: pointer;
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ borderTop, theme: { colors } }) => css`
    color: ${colors.gray};

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
        fill: ${colors.gray};
      }
    }

    &:hover {
      color: ${colors.primary};
      background-color: ${colors.hoverGray};

      svg {
        path {
          fill: ${colors.primary};
        }
      }
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

const index: FC = () => {
  // Get user data from cookie
  const { user } = checkCookie();

  const handleSignOut = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    signOut();
  };

  // Hide dropdown when clicked outside it's Ref
  const resourcesPopupRef = useRef<HTMLDivElement>(null);

  // Toggle resources dropdown
  const [dropdown, setDropdown] = useState(false);

  const handleClickOutside = (event: any) => {
    if (
      resourcesPopupRef.current &&
      !resourcesPopupRef.current.contains(event.target as Element)
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

  return (
    <Container>
      <Row
        justifyContent={{
          xs: "space-between",
          sm: "space-between",
          md: "space-between",
        }}
        alignItems={{ xs: "center", sm: "center", md: "center" }}
        padding={{ md: { top: 2, bottom: 2 }, sm: { top: 2, bottom: 2 } }}
      >
        <Column responsivity={{ md: 3, sm: 4 }}>
          <Link href="/">
            <CustomLink>
              <Logo $width="100" $height="50" $color="primary" />
            </CustomLink>
          </Link>
        </Column>

        <Column responsivity={{ md: 9, sm: 4 }} textAlign={{ md: "right" }}>
          <UserModal ref={resourcesPopupRef}>
            <User onClick={() => setDropdown(!dropdown)}>
              <Heading as="h6" weight="semiBold">
                {user?.firstName.substring(0, 1)}
                {user?.lastName.substring(0, 1)}
              </Heading>
            </User>

            {dropdown && (
              <Dropdown>
                <DropdownItem>
                  <Heading as="h6">
                    {user?.firstName} {user?.lastName}
                  </Heading>
                </DropdownItem>

                <Link href="/my-account">
                  <DropdownItem>
                    <MyProfile />

                    <span>My profile</span>
                  </DropdownItem>
                </Link>

                <Link href="/invoice/add">
                  <DropdownItem>
                    <CreateInvoice />

                    <span>Create invoice</span>
                  </DropdownItem>
                </Link>

                <DropdownItem onClick={handleSignOut} borderTop>
                  <SignOut />

                  <span>Sign out</span>
                </DropdownItem>
              </Dropdown>
            )}
          </UserModal>
        </Column>
      </Row>
    </Container>
  );
};

export { index as Header };
