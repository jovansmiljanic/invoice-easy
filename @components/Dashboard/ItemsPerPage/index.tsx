// Core types
import type { FC } from "react";

// Vendors
import Select from "react-select";
import styled, { css } from "styled-components";

// NextJS
import { useRouter } from "next/router";

interface ItemsPerPage {
  limit: number;
  path: string;
}

const index: FC<ItemsPerPage> = ({ limit, path }) => {
  const { push } = useRouter();

  // Handle types
  const handleChangeType = (selected: any) => {
    push(`/${path}?&page=${0}&limit=${selected.value}`);
  };

  return (
    <CustomSelect
      instanceId="newClient"
      options={[
        {
          options: [
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "30", label: "30" },
            { value: "50", label: "50" },
          ],
        },
      ]}
      placeholder={limit}
      onChange={selected => handleChangeType(selected)}
    />
  );
};

export { index as ItemsPerPage };

const CustomSelect = styled(Select)`
  ${({ theme: { colors } }) => css`
    #react-select-newClient-placeholder {
      z-index: 1;
    }

    * > input {
      padding: 2px 0 !important;
    }

    * {
      font-size: 14px;
      border-radius: 5px !important;
      border-color: ${colors.lightGray} !important;
      color: ${colors.textColor} !important;
      background-color: ${colors.white} !important;
    }

    .css-1dimb5e-singleValue {
      color: ${colors.textColor} !important;
      z-index: 10;
    }
  `}
`;
