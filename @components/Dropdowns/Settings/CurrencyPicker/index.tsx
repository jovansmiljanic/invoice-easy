// Core types
import { useCallback, type FC, useEffect, useMemo } from "react";

// Vendors
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icon
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
// Client utils
import { useDropdown } from "@utils/client";
import { useSetCookie } from "@utils/shared";

const index: FC = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { isOpen, setIsOpen, ref } = useDropdown();

  const closeDropdown = useCallback(() => setIsOpen(false), [setIsOpen]);

  const currency = useMemo(
    () => ({
      euro: "Euro",
      rds: "RSD",
      dolar: "Dolar",
      none: "none",
    }),
    [t]
  );

  const changeCurrency = useCallback(
    (curr: string) => {
      useSetCookie({
        name: "currency",
        value: curr,
        days: 100,
      });

      closeDropdown();
      router.reload();
    },

    [closeDropdown]
  );

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
        <CurrencyExchangeOutlinedIcon />
        {t("home:currency")}
      </CurrentFlag>

      {isOpen && (
        <Dropdown>
          {Object.entries(currency).map(([curr, name]) => (
            <DropdownItem key={curr} onClick={() => changeCurrency(curr)}>
              <span>{name}</span>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </ToggleDiv>
  );
};

export { index as CurrencyPicker };

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
