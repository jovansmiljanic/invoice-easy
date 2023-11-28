// Core types
import { type FC, useContext } from "react";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// SVG
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

// GLobal types
import { Product } from "@types";

// Client utils
import { useDropdown } from "@utils/client";
import { GridContext } from "@components/MainTable";
import { StoreContext } from "@context";

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
  updatedItems: Product;
}

const index: FC<Actions> = ({ updatedItems }) => {
  // Translation
  const { t } = useTranslation();

  const {
    setIsModalOpen,
    isModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
  } = useContext(GridContext);

  const { setIsModalData } = useContext(StoreContext);

  const { isOpen, setIsOpen, ref } = useDropdown();

  return (
    <Actions ref={ref}>
      <PopupModal>
        <MoreVertOutlinedIcon
          fontSize="small"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <ModalItems>
            <ModalItem
              onClick={() => {
                // Edit client
                setIsModalData(updatedItems);

                setIsModalOpen(!isModalOpen);
              }}
            >
              {t("table:edit")}
            </ModalItem>

            <ModalItem
              onClick={() => {
                // Edit client
                setIsModalData(updatedItems);

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
