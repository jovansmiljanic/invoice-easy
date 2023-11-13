// Core types
import { type FC, useContext } from "react";

// Vendors
import styled, { css } from "styled-components";

// Icon
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// Store context
import { StoreContext } from "@context";

const index: FC = () => {
  const { isPriceShown, toggleIsPriceShown } = useContext(StoreContext);

  return (
    <ToggleDiv onClick={toggleIsPriceShown}>
      {isPriceShown === "true" ? (
        <VisibilityOutlinedIcon />
      ) : (
        <VisibilityOffOutlinedIcon />
      )}
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
