// Core types
import type { FC } from "react";
import { useContext } from "react";

// Next types
import type { Session } from "next-auth";

// NExtjs
import Link from "next/link";

// Vendors
import styled from "styled-components";

// Local components
import { User } from "./User";
import { Settings } from "./Settings";
import { Notification } from "./Notification";

// Global components
import { Heading, Logo } from "@components";
import { StoreContext } from "@context";

interface Header {
  session?: Session;
  title?: string;
}

const index: FC<Header> = ({ session, title }) => {
  const { isPhone } = useContext(StoreContext);

  return (
    <Header>
      {isPhone ? (
        <Link href="/">
          <Logo $width="100" $height="60" $color="secondary" />
        </Link>
      ) : (
        title && <Heading as="h4">{title}</Heading>
      )}

      <Wrap>
        <Notification />

        <Settings />

        {session && <User session={session} />}
      </Wrap>
    </Header>
  );
};

export { index as Header };

const Header = styled.div`
  grid-column: 2 / 3;
  grid-row: 1;

  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 12px;
  }
`;
