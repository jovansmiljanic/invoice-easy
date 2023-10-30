// Core types
import { type FC, useContext } from "react";

// Store context
import { StoreContext } from "@context";

// Vendors
import styled from "styled-components";

// Icons
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const index: FC = () => {
  const { theme, toggleTheme } = useContext(StoreContext);

  return (
    <ToggleDiv onClick={toggleTheme}>
      {theme === "light" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </ToggleDiv>
  );
};

export { index as ThemePicker };

const ToggleDiv = styled.div`
  margin-right: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 25px;
    height: auto;
  }
`;
