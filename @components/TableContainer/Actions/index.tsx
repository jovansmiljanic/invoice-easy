// Core types
import { type FC, useState, useContext } from "react";

// Vendors
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

// SVG
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// Global components
import { DownloadInvoice } from "@components";

// Store context
import { StoreContext } from "@context";

// GLobal types
import { Invoice } from "@types";

// Client utils
import { invoicePaid } from "@utils/client";

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${({ theme: { breakpoints, colors } }) => css`
    a {
      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        margin-right: 6px;
      }
    }

    svg {
      path {
        fill: ${colors.textColor};
      }
    }

    @media (max-width: ${breakpoints.md}px) {
      justify-content: flex-start;
    }
  `}
`;

const ModalItems = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
  border-radius: 5px;
  padding: 5px 0;

  display: flex;
  flex-direction: column;

  ${({ theme: { colors } }) => css`
    min-width: 160px;
    min-height: 50px;
    box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);
    background-color: ${colors.background};
  `}
`;

const ModalItem = styled.div`
  padding: 10px 0 10px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};

    &:hover {
      background-color: ${colors.hoverGray};
    }

    &:nth-child(4) {
      color: ${colors.danger};
      border-top: 1px solid ${colors.lightGray};
    }
  `}
`;

const PopupModal = styled.div`
  position: relative;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Actions {
  updatedItems: Invoice;
}

const index: FC<Actions> = ({ updatedItems }) => {
  const router = useRouter();

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { setIsClientData, setIsConfirmModal, isConfirmModal } =
    useContext(StoreContext);

  return (
    <Actions>
      <Link href={`/invoice/preview/${updatedItems._id}`}>
        <VisibilityOutlinedIcon fontSize="small" />
      </Link>

      <DownloadInvoice invoice={updatedItems} type="icon" />

      <PopupModal>
        <MoreVertOutlinedIcon
          fontSize="small"
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        />

        {isOptionsOpen && (
          <ModalItems>
            <Link href={`/invoice/preview/${updatedItems._id}`}>
              <ModalItem>Preview</ModalItem>
            </Link>

            {updatedItems.status === "2" && (
              <ModalItem
                onClick={() => invoicePaid({ _id: updatedItems._id, router })}
              >
                Mark as paid
              </ModalItem>
            )}

            <DownloadInvoice invoice={updatedItems} type="modalItem" />

            <Link href={`/invoice/edit/${updatedItems._id}`}>
              <ModalItem>Edit</ModalItem>
            </Link>

            <ModalItem
              onClick={() => {
                // Edit client
                setIsClientData(updatedItems);

                setIsConfirmModal(!isConfirmModal);
              }}
            >
              Delete invoice
            </ModalItem>
          </ModalItems>
        )}
      </PopupModal>
    </Actions>
  );
};

export { index as Actions };