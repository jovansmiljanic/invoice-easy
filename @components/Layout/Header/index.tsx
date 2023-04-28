// Core types
import { FC, useEffect, useRef, useState } from "react";

// NextJS
import Link from "next/link";

// Vendors
import styled, { css } from "styled-components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Global components
import { Heading, Logo } from "@components";
import { checkCookie } from "@utils/client";
import { signOut } from "next-auth/react";

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
    background-color: ${colors.white};
  `}
`;

const UserInfo = styled.div``;

const DropdownItem = styled.div`
  padding: 15px 0;

  ${({ theme: { colors } }) => css`
    &:hover {
      background-color: ${colors.hoverGray};
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGray};
    }
  `}
`;

const SignOut = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 5px;
  }
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
                  <UserInfo>
                    {user?.firstName} {user?.lastName}
                  </UserInfo>
                </DropdownItem>

                <DropdownItem>
                  <SignOut onClick={handleSignOut}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.265 3.807L7.412 5.446C6.01818 6.42177 4.97176 7.8165 4.42474 9.4276C3.87772 11.0387 3.8586 12.7822 4.37015 14.4049C4.88171 16.0276 5.89729 17.445 7.26937 18.4511C8.64146 19.4572 10.2986 19.9996 12 19.9996C13.7014 19.9996 15.3585 19.4572 16.7306 18.4511C18.1027 17.445 19.1183 16.0276 19.6299 14.4049C20.1414 12.7822 20.1223 11.0387 19.5753 9.4276C19.0282 7.8165 17.9818 6.42177 16.588 5.446L17.735 3.807C19.053 4.72843 20.1289 5.95446 20.8715 7.38087C21.614 8.80728 22.0012 10.3919 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C1.99884 10.3919 2.38599 8.80728 3.12853 7.38087C3.87107 5.95446 4.94705 4.72843 6.265 3.807ZM11 12V2H13V12H11Z"
                        fill="black"
                      />
                    </svg>
                    <span>Sign out</span>
                  </SignOut>
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
