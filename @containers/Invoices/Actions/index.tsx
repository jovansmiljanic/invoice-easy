// Core types
import { type FC, useState, useContext } from "react";

// Vendors
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// SVG
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// Global components
import { DownloadInvoice } from "@components";

// GLobal types
import { Invoice, MyAccount } from "@types";

// Client utils
import { invoicePaid } from "@utils/client";
import { GridContext } from "@components/MainTable";

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

  ${({ theme: { colors, breakpoints } }) => css`
    min-width: 160px;
    min-height: 50px;
    box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);
    background-color: ${colors.background};

    @media (max-width: ${breakpoints.md}px) {
      left: 0;
    }
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
  currentUser: MyAccount | null;
}

const index: FC<Actions> = ({ updatedItems, currentUser }) => {
  // Translation
  const { t } = useTranslation();

  const router = useRouter();

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { setModalData, isConfirmModalOpen, setIsConfirmModalOpen } =
    useContext(GridContext);

  if (!currentUser) return <>Loading...</>;

  return (
    <Actions>
      <Link href={`/invoice/preview/${updatedItems._id}`}>
        <VisibilityOutlinedIcon fontSize="small" />
      </Link>

      <DownloadInvoice
        invoice={updatedItems}
        userData={currentUser}
        type="icon"
      />

      <PopupModal>
        <MoreVertOutlinedIcon
          fontSize="small"
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        />

        {isOptionsOpen && (
          <ModalItems>
            <Link href={`/invoice/preview/${updatedItems._id}`}>
              <ModalItem>{t("table:preview")}</ModalItem>
            </Link>

            {updatedItems.status === "2" && (
              <ModalItem
                onClick={() => invoicePaid({ _id: updatedItems._id, router })}
              >
                {t("table:markAsPaid")}
              </ModalItem>
            )}

            <DownloadInvoice
              invoice={updatedItems}
              userData={currentUser}
              type="modalItem"
            />

            <Link href={`/invoice/edit/${updatedItems._id}`}>
              <ModalItem>{t("table:edit")}</ModalItem>
            </Link>

            <ModalItem
              onClick={() => {
                // Edit client
                setModalData(updatedItems);

                setIsConfirmModalOpen(!isConfirmModalOpen);
              }}
            >
              {t("table:delete")}
            </ModalItem>
          </ModalItems>
        )}
      </PopupModal>
    </Actions>
  );
};

export { index as Actions };
