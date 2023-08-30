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
  width: 500px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme: { breakpoints, colors } }) => css`
    background-color: ${colors.background};

    @media (max-width: ${breakpoints.md}px) {
      overflow: scroll;
      width: 90%;
    }
  `}
`;

const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 25px;
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
        <div>
          <Heading as="h5" padding={{ md: { top: 6, bottom: 1, left: 4 } }}>
            Are you sure you want to delete{" "}
            {isClientData ? isClientData.clientName : "this invoice"}?
          </Heading>

          <Heading as="h6" padding={{ md: { left: 4 } }}>
            This action cannot be undone.
          </Heading>
        </div>

        <ButtonsWrap>
          <Button
            variant="secondary"
            onClick={() => setIsConfirmModal(false)}
            margin={{ md: { right: 1 } }}
            size="small"
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={() => (
              deleteItem({ id: isClientData?._id, router, path }),
              setIsConfirmModal(false)
            )}
            margin={{ md: { right: 1 } }}
            size="small"
          >
            Delete
          </Button>
        </ButtonsWrap>
      </Modal>
    </Background>
  );
};

export { index as ConfirmModal };
