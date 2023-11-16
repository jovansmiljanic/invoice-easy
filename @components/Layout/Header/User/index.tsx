// Core types
import { useContext, type FC } from "react";

// Global components
import { Heading, UserDropdown } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Vendor types
import type { Session } from "next-auth";

// CLient utils
import { useDropdown } from "@utils/client";

// Icons
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { StoreContext } from "@context";
import useTranslation from "next-translate/useTranslation";

interface User {
  session: Session;
}

const index: FC<User> = ({ session }) => {
  const { isOpen, setIsOpen, ref } = useDropdown();

  const { isPhone } = useContext(StoreContext);

  // Translation
  const { t } = useTranslation();

  return (
    <UserModal ref={ref}>
      <Wrapper onClick={() => setIsOpen(!isOpen)}>
        <User>
          <Heading as="h6" weight="medium" color="textColor">
            {session.user.firstName.substring(0, 1)}
            {session.user.lastName.substring(0, 1)}
          </Heading>
        </User>

        {!isPhone && (
          <Wrap>
            <Heading as="h6">
              {t("home:greeting")}, {session.user.firstName}
            </Heading>
          </Wrap>
        )}

        <KeyboardArrowDownOutlinedIcon />
      </Wrapper>

      {isOpen && <UserDropdown session={session} />}
    </UserModal>
  );
};

export { index as User };

const UserModal = styled.div`
  position: relative;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const User = styled.div`
  width: 100%;
  height: 100%;
  width: 43px;
  height: 43px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  ${({ theme: { colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.secondary};
  `}
`;
