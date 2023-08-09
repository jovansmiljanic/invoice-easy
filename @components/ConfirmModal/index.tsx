// Core
import { type FC, useRef, useEffect, useContext } from "react";

// Store context
import { StoreContext } from "@context";

// Client utils
import { deleteItem } from "@utils/client";

// Vendors
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Modal = styled.div`
  width: 400px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme: { breakpoints, colors } }) => css`
    background-color: ${colors.background};

    @media (max-width: ${breakpoints.md}px) {
      overflow: scroll;
      width: 90%;
    }
  `}
`;

const index: FC = () => {
  // Router
  const router = useRouter();

  // Global context from store
  const { setIsConfirmModal, isClientData } = useContext(StoreContext);

  // Hide dropdown when clicked outside it's Ref
  const modalPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalPopupRef.current &&
      !modalPopupRef.current.contains(event.target as Node)
    ) {
      setIsConfirmModal(false);
    }
  };

  const path =
    router.asPath === "/clients"
      ? "client"
      : router.asPath === "/"
      ? "invoice"
      : "";

  return (
    <Background>
      <Modal ref={modalPopupRef}>
        <Heading as="h4">
          Are you sure you want to delete {isClientData?.clientName}?
        </Heading>
        <Button variant="secondary" onClick={() => setIsConfirmModal(false)}>
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={() => (
            deleteItem({ id: isClientData?._id, router, path }),
            setIsConfirmModal(false)
          )}
        >
          Delete
        </Button>
      </Modal>
    </Background>
  );
};

export { index as ConfirmModal };
