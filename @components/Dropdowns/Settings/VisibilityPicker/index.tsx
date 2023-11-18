// Core types
import { type FC } from "react";

// Vendors
import styled from "styled-components";

// Icon
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const index: FC = () => {
  return (
    <ToggleDiv>
      <VisibilityOutlinedIcon />
    </ToggleDiv>
  );
};

export { index as VisibilityPicker };

const ToggleDiv = styled.div`
  margin-right: 15px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 25px;
    height: auto;
  }
`;
