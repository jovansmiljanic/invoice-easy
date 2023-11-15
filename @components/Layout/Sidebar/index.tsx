// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Nextjs
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

// GLobal components
import { Logo } from "@components";

// Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import useTranslation from "next-translate/useTranslation";

const Sidebar = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 4;

  position: sticky;
  top: 0;
  overflow-y: auto;
  height: 100vh;

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Wrap = styled.div`
  width: 100%;
`;

const Item = styled.div<{ active: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  border: 5px;

  svg {
    width: auto;
    height: 30px;
    margin-right: 8px;
  }

  ${({ active, theme: { colors } }) => css`
    ${active &&
    `
      background-color: ${colors.hoverGray};
    `}

    color: ${colors.textColor};

    &:hover {
      color: ${colors.textColor};
      background-color: ${colors.hoverGray};
    }
  `}
`;

const SignOut = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: 10px;

  ${({ theme: { colors } }) => css`
    &:hover {
      background-color: ${colors.hoverGray};
    }
  `}
`;

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  // Router
  const router = useRouter();

  const links = [
    {
      label: t("home:home"),
      href: "/",
      icon: <HomeOutlinedIcon />,
    },
    {
      label: t("home:invoices"),
      href: "/invoice",
      icon: <FileCopyOutlinedIcon />,
    },
    {
      label: t("home:clients"),
      href: "/clients",
      icon: <PeopleAltOutlinedIcon />,
    },
    {
      label: t("home:products"),
      href: "/products",
      icon: <Inventory2OutlinedIcon />,
    },
    {
      label: t("home:myProfile"),
      href: "/my-account",
      icon: <ManageAccountsOutlinedIcon />,
    },
  ];

  return (
    <Sidebar>
      <Link href="/">
        <Logo $width="100" $height="50" $color="secondary" />
      </Link>

      <Wrap>
        {links.map((link, i) => (
          <Link href={link.href} key={i}>
            <Item active={router.pathname === link.href}>
              {link.icon}

              <span>{link.label}</span>
            </Item>
          </Link>
        ))}
      </Wrap>

      <SignOut onClick={() => signOut()}>
        <LogoutOutlinedIcon />
        <span>{t("home:signOut")}</span>
      </SignOut>
    </Sidebar>
  );
};

export { index as Sidebar };
