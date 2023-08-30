// Core types
import type { FC } from "react";

//
import { Button, Heading } from "@components";

// SVG
import { NotFoundIcon } from "public/svg";

// Vendors
import styled, { css } from "styled-components";

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      text-align: center;
      flex-direction: column;

      svg {
        width: 100%;
      }
    }
  `}
`;

interface NotFound {}

const index: FC<NotFound> = () => {
  return (
    <NotFound>
      <div>
        <Heading
          as="h4"
          weight="bold"
          padding={{
            xs: { bottom: 1, top: 4 },
            sm: { bottom: 1, top: 4 },
            md: { bottom: 1 },
          }}
        >
          No invoices found!
        </Heading>

        <Heading
          as="h6"
          padding={{
            xs: { bottom: 2 },
            sm: { bottom: 2 },
            md: { bottom: 2 },
          }}
        >
          Please click on create invoice to start generating
        </Heading>

        <Button variant="secondary" as="a" href="/invoice/add">
          Create Invoice
        </Button>
      </div>

      <div>
        <NotFoundIcon />
      </div>
    </NotFound>
  );
};

export { index as NotFound };
