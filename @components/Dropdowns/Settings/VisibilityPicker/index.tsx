// Core types
import { useCallback, type FC, useEffect, useMemo } from "react";

// Vendors
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icon
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// Client utils
import { useDropdown } from "@utils/client";

const index: FC = () => {
  const { t } = useTranslation();

  const { isOpen, setIsOpen, ref } = useDropdown();

  const closeDropdown = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, closeDropdown]);

  return (
    <ToggleDiv ref={ref}>
      <CurrentFlag aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <VisibilityOffOutlinedIcon />
        {t("home:visibility")}
      </CurrentFlag>

      {isOpen && (
        <Dropdown>
          <DropdownItem>Show numbers</DropdownItem>

          <DropdownItem>Hide numbers</DropdownItem>
        </Dropdown>
      )}
    </ToggleDiv>
  );
};

export { index as VisibilityPicker };

const ToggleDiv = styled.div``;

const CurrentFlag = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  padding: 15px 20px;

  svg {
    width: 22px;
    height: auto;
  }
`;

const Dropdown = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const DropdownItem = styled.div`
  width: 100%;

  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  text-align: left;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};
    border-bottom: 1px solid ${colors.lightGray};

    &:hover {
      background-color: ${colors.hoverGray};
    }
  `}
`;
