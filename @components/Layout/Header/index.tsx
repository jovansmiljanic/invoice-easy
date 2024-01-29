// Core types
import type { FC } from "react";
import { useContext } from "react";

// Next types
import type { Session } from "next-auth";

// NExtjs
import Link from "next/link";

// Vendors
import styled, { css } from "styled-components";

// Local components
import { User } from "./User";
import { Settings } from "./Settings";
import { Notification } from "./Notification";

// Global components
import { Heading, Logo } from "@components";

interface Header {
  session?: Session;
  title?: string;
}

const index: FC<Header> = ({ session, title }) => {
  return (
    <Header session={session}>
      {session ? (
        <Heading as="h4" weight="medium" color="textColor">
          {title}
        </Heading>
      ) : (
        <Link href="/">
          <Logo $width="100" $height="40" $color="secondary" />
        </Link>
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

const Header = styled.div<{ session?: Session }>`
  grid-column: 2 / 3;
  grid-row: 1;

  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  ${({ session }) => css`
    ${!session &&
    css`
      max-width: 1340px;
      margin: auto;
    `}
  `}
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 12px;
  }
`;
