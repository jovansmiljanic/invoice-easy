// Core types
import type { FC } from "react";

// Client utils
import { useDropdown } from "@utils/client";

// Vendors
import styled from "styled-components";

// Icons
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

// Global components
import { NotificationDropdown } from "@components";

const index: FC = () => {
  const { isOpen, setIsOpen, ref } = useDropdown();

  return (
    <Notification ref={ref}>
      <NotificationsNoneOutlinedIcon onClick={() => setIsOpen(!isOpen)} />

      {isOpen && <NotificationDropdown />}
    </Notification>
  );
};

export { index as Notification };

const Notification = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;
