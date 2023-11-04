// Core types
import { type FC, useEffect, useRef, useState } from "react";

// Icons
// import { English, Serbia, Slovenia } from "public/svg";
import LanguageIcon from "@mui/icons-material/Language";

// Vendors
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

const index: FC = () => {
  // Handle router
  const router = useRouter();

  // Set state fot dropdown
  const [lngDropdown, setlngDropdown] = useState(false);

  // Set ref for dropdown
  const lngPopupRef = useRef<HTMLDivElement>(null);

  // Function for close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      lngPopupRef.current &&
      !lngPopupRef.current.contains(event.target as Node)
    ) {
      setlngDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <ToggleDiv ref={lngPopupRef}>
      <CurrentFlag onClick={() => setlngDropdown(!lngDropdown)}>
        <LanguageIcon />
      </CurrentFlag>

      {lngDropdown && (
        <Dropdown onClick={() => setlngDropdown(!lngDropdown)}>
          <Link href={router.asPath} locale="sr">
            <DropdownItem>
              <span>Serbian</span>
            </DropdownItem>
          </Link>

          <Link href={router.asPath} locale="si">
            <DropdownItem>
              <span>Slovenian</span>
            </DropdownItem>
          </Link>
          <Link href={router.asPath} locale="en">
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
