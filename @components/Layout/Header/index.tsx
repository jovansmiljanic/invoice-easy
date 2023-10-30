// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Vendor types
import type { Session } from "next-auth";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Local components
import { Logo } from "./Logo";
import { User } from "./User";
import { ThemePicker } from "./ThemePicker";
import { LanguagePicker } from "./LanguagePicker";
import { VisibilityPicker } from "./VisibilityPicker";

const Border = styled.div`
  width: 100%;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface Header {
  session?: Session | null;
}

const index: FC<Header> = ({ session }) => {
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
          <Logo />
        </Column>

        <Column
          responsivity={{ md: 9, sm: 4 }}
          textAlign={{ md: "right" }}
          padding={{ xs: { bottom: 2 }, sm: { bottom: 2 }, md: { bottom: 2 } }}
        >
          <Wrap>
            <VisibilityPicker />

            <ThemePicker />

            <LanguagePicker />

            {session && <User session={session} />}
          </Wrap>
        </Column>

        <Border />
      </Row>
    </Container>
  );
};

export { index as Header };
