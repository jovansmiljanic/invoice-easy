// Core types
import type { FC } from "react";

// Next types
import type { Session } from "next-auth";

// Vendors
import styled from "styled-components";

// Local components
import { User } from "./User";
import { Settings } from "./Settings";
import { Notification } from "./Notification";

// Global components
import { Heading } from "@components";

interface Header {
  session?: Session;
}

const index: FC<Header> = ({ session }) => {
  return (
    <Header>
      <Heading as="h4">Dashboard Overview</Heading>

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
