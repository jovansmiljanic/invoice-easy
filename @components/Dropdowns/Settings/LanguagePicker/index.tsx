// Core types
import { useMemo, type FC, useCallback, useEffect } from "react";

// Vendors
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import LanguageIcon from "@mui/icons-material/Language";

// Client utils
import { useDropdown } from "@utils/client";

// Shared utils
import { useGetCookie, useSetCookie } from "@utils/shared";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { useSession } from "next-auth/react";

const index: FC = () => {
  const { t } = useTranslation();

  const router = useRouter();

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

  const languages = useMemo(
    () => ({
      sr: t("home:languagesSr"),
      si: t("home:languagesSi"),
      en: t("home:languagesEn"),
    }),
    [t]
  );

  const { data: session, status } = useSession();

  const changeLanguage = useCallback(
    (locale: string) => {
      const updateLanguageAndUser = async () => {
        try {
          const data = { locale }; // Assuming you want to update the user's locale

          // await axios({
          //   method: "PUT",
          //   url: `/api/registration`,
          //   data: {
          //     _id: session?.user._id,
          //     ...data,
          //   },
          // });

          // // If the API call succeeds, proceed with setting the cookie and updating the route
          // useSetCookie({
          //   name: "lang",
          //   value: locale,
          //   days: 100,
          // });

          // Push the current path with the new locale
          router.push(router.asPath, router.asPath, { locale });

          // Close the dropdown if applicable
          closeDropdown();
        } catch (err) {
          console.log(err);
          // Handle any errors, for example by setting an error state or showing a notification
        }
      };

      // Call the async function
      updateLanguageAndUser();
    },
    [router, closeDropdown] // Dependencies for useCallback
  );

  return (
    <ToggleDiv ref={ref}>
      <CurrentFlag aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <LanguageIcon />

        {t("home:language")}
      </CurrentFlag>

      {isOpen && (
        <Dropdown>
          {Object.entries(languages).map(([locale, name]) => (
            <DropdownItem key={locale} onClick={() => changeLanguage(locale)}>
              <span>{name}</span>
            </DropdownItem>
          ))}
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

    &:hover {
      background-color: ${colors.hoverGray};
    }
  `}
`;
