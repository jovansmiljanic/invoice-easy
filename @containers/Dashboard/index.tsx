// Core
import { type FC } from "react";

// Core types
import { Invoice } from "@types";

// Client utils
import { daysLeft, getClientName, getTotalPrice } from "@utils/client";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";
import Link from "next/link";
import { Table } from "@components";

interface Dashboard {}

const index: FC<Dashboard> = () => {
  return (
    <Container backgroundColor="background" fullHeight>
      <Row
        padding={{
          xs: { top: 6, bottom: 6 },
          sm: { top: 6, bottom: 6 },
          md: { top: 10, bottom: 10 },
        }}
      >
        <Column responsivity={{ md: 12 }}>
          <Table />
        </Column>
      </Row>
    </Container>
  );
};

export { index as Dashboard };
