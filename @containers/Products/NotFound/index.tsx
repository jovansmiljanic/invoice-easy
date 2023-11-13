// Core types
import { useContext, type FC } from "react";

// Global components
import { Button, Heading } from "@components";

// NextJS
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import { StoreContext } from "@context";

const NotFound = styled.div`
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;

const index: FC = () => {
  const { isProductModalOpen, setIsProductModalOpen } =
    useContext(StoreContext);

  return (
    <NotFound>
      <div>
        <Heading
          as="h4"
          weight="bold"
          padding={{
            xs: { bottom: 1 },
            sm: { bottom: 1 },
            md: { bottom: 1 },
          }}
        >
          No products found!
        </Heading>

        <Heading
          as="h6"
          padding={{
            xs: { bottom: 2 },
            sm: { bottom: 2 },
            md: { bottom: 2 },
          }}
        >
          Please click on create product to add first one!
        </Heading>

        <Button
          variant="secondary"
          onClick={() => setIsProductModalOpen(!isProductModalOpen)}
        >
          Create Invoice
        </Button>
      </div>
    </NotFound>
  );
};

export { index as NotFound };
