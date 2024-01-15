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

const index: FC = () => {
  // Handle router
  const router = useRouter();

  const { isOpen, setIsOpen, ref } = useDropdown();

  return (
    <ToggleDiv ref={ref}>
      <CurrentFlag onClick={() => setIsOpen(!isOpen)}>
        <LanguageIcon />
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

const ToggleDiv = styled.div`
  position: relative;

  svg {
    width: 30px;
    height: auto;
  }
`;

const CurrentFlag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;

  svg {
    width: 25px;
    height: auto;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 100;
  border-radius: 5px;
  min-width: 120px;
  box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);

  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};
  `}
`;

const DropdownItem = styled.div`
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    margin-left: 8px;
    font-size: 14px;
  }

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};
    border-bottom: 1px solid ${colors.lightGray};

    &:hover {
      background-color: ${colors.hoverGray};
    }
  `}
`;
