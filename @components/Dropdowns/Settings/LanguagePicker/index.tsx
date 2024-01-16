// Core types
import { type FC } from "react";

// Vendors
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import LanguageIcon from "@mui/icons-material/Language";

// Client utils
import { useDropdown } from "@utils/client";

// Shared utils
import { useSetCookie } from "@utils/shared";
import useTranslation from "next-translate/useTranslation";

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  // Handle router
  const router = useRouter();

  const { isOpen, setIsOpen, ref } = useDropdown();

  return (
    <ToggleDiv ref={ref}>
      <CurrentFlag onClick={() => setIsOpen(!isOpen)}>
        <LanguageIcon />

        {t("home:language")}
      </CurrentFlag>

      {isOpen && (
        <Dropdown onClick={() => setIsOpen(!isOpen)}>
          <Link
            href={router.asPath}
            locale="sr"
            onClick={() =>
              useSetCookie({
                name: "lang",
                value: "sr",
                days: 100,
              })
            }
          >
            <DropdownItem>
              <span>Serbian</span>
            </DropdownItem>
          </Link>

          <Link
            href={router.asPath}
            locale="si"
            onClick={() =>
              useSetCookie({
                name: "lang",
                value: "si",
                days: 100,
              })
            }
          >
            <DropdownItem>
              <span>Slovenian</span>
            </DropdownItem>
          </Link>

          <Link
            href={router.asPath}
            locale="en"
            onClick={() =>
              useSetCookie({
                name: "lang",
                value: "en",
                days: 100,
              })
            }
          >
            <DropdownItem>
              <span>English</span>
            </DropdownItem>
          </Link>
        </Dropdown>
      )}
    </ToggleDiv>
  );
};

export { index as LanguagePicker };

const ToggleDiv = styled.div``;

const CurrentFlag = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;

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

  padding: 10px 0;
  font-size: 14px;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};
    border-bottom: 1px solid ${colors.lightGray};

    &:hover {
      background-color: ${colors.lighterGray};
    }
  `}
`;
