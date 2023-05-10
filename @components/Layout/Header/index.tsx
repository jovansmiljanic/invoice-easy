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
    color: ${colors.gray};
    background-color: ${colors.white};
  `}
`;

const DropdownItem = styled.div`
  cursor: pointer;
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ theme: { colors } }) => css`
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C12.7417 3 13.4667 3.21993 14.0834 3.63199C14.7001 4.04404 15.1807 4.62971 15.4645 5.31494C15.7484 6.00016 15.8226 6.75416 15.6779 7.48159C15.5333 8.20902 15.1761 8.8772 14.6517 9.40165C14.1272 9.9261 13.459 10.2833 12.7316 10.4279C12.0042 10.5726 11.2502 10.4984 10.5649 10.2145C9.87971 9.93072 9.29404 9.45007 8.88199 8.83339C8.46993 8.2167 8.25 7.49168 8.25 6.75C8.25 5.75544 8.64509 4.80161 9.34835 4.09835C10.0516 3.39509 11.0054 3 12 3ZM12 1.5C10.9616 1.5 9.94661 1.80791 9.08326 2.38478C8.2199 2.96166 7.54699 3.7816 7.14963 4.74091C6.75227 5.70022 6.64831 6.75582 6.85088 7.77422C7.05345 8.79262 7.55346 9.72808 8.28769 10.4623C9.02192 11.1965 9.95738 11.6966 10.9758 11.8991C11.9942 12.1017 13.0498 11.9977 14.0091 11.6004C14.9684 11.203 15.7883 10.5301 16.3652 9.66674C16.9421 8.80339 17.25 7.78835 17.25 6.75C17.25 5.35761 16.6969 4.02226 15.7123 3.03769C14.7277 2.05312 13.3924 1.5 12 1.5ZM19.5 22.5H18V18.75C18 18.2575 17.903 17.7699 17.7145 17.3149C17.5261 16.86 17.2499 16.4466 16.9017 16.0983C16.5534 15.7501 16.14 15.4739 15.6851 15.2855C15.2301 15.097 14.7425 15 14.25 15H9.75C8.75544 15 7.80161 15.3951 7.09835 16.0983C6.39509 16.8016 6 17.7554 6 18.75V22.5H4.5V18.75C4.5 17.3576 5.05312 16.0223 6.03769 15.0377C7.02226 14.0531 8.35761 13.5 9.75 13.5H14.25C15.6424 13.5 16.9777 14.0531 17.9623 15.0377C18.9469 16.0223 19.5 17.3576 19.5 18.75V22.5Z"
                        fill="black"
                      />
                    </svg>

                    <span>My profile</span>
                  </DropdownItem>
                </Link>

                <Link href="/new-company">
                  <DropdownItem>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 19H18.5V16.5H21V15.5H18.5V13H17.5V15.5H15V16.5H17.5V19ZM18 21C16.6167 21 15.4373 20.5123 14.462 19.537C13.4867 18.5617 12.9993 17.3827 13 16C13 14.6167 13.4877 13.4373 14.463 12.462C15.4383 11.4867 16.6173 10.9993 18 11C19.3833 11 20.5627 11.4877 21.538 12.463C22.5133 13.4383 23.0007 14.6173 23 16C23 17.3833 22.5123 18.5627 21.537 19.538C20.5617 20.5133 19.3827 21.0007 18 21ZM4 19V7L12 1L20 7V9.3C19.6833 9.2 19.3583 9.125 19.025 9.075C18.6917 9.025 18.35 9 18 9V8L12 3.5L6 8V17H11.075C11.125 17.35 11.2 17.6917 11.3 18.025C11.4 18.3583 11.525 18.6833 11.675 19H4Z"
                        fill="black"
                      />
                    </svg>

                    <span>New company</span>
                  </DropdownItem>
                </Link>

                <DropdownItem onClick={handleSignOut}>
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
