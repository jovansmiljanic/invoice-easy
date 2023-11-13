// Core types
import type { FC } from "react";

// Client utils
import { useDropdown } from "@utils/client";

// Vendors
import styled from "styled-components";

// Icons
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// Global components
import { SettingsDropdown } from "@components";

const index: FC = () => {
  const { isOpen, setIsOpen, ref } = useDropdown();

  return (
    <Settings ref={ref}>
      <SettingsOutlinedIcon onClick={() => setIsOpen(!isOpen)} />

      {isOpen && <SettingsDropdown />}
    </Settings>
  );
};

export { index as Settings };

const Settings = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;
