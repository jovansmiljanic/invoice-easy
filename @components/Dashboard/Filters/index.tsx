// Core
import { type FC, useState, useEffect } from "react";

// Styles
import { Filter, Label } from "@styles/Filter";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// SVG
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

// Client utils
import { useDropdown } from "@utils/client";

// Dropdown container
const Container = styled.div`
  width: 240px;
  padding: 10px 0;
  position: absolute;
  top: 115%;
  border-radius: 5px;
  box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45),
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  z-index: 50;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `};
`;

// Checkbox item
const Checkbox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ theme: { colors, defaults } }) => css`
    padding: ${defaults.gutter / 2}rem 10px;

    &:hover {
      background-color: ${colors.hoverGray};
    }
  `}
`;

// Check mark
const Check = styled.div<{ active?: boolean | undefined }>`
  width: 24px;
  height: 24px;
  display: flex;
  padding: 3px;
  margin-right: 10px;

  ${({ active, theme: { colors } }) => css`
    border: 1px solid ${colors.lightGray};

    ${active &&
    `
      background: ${colors.secondary};

    `};
  `}
`;

const Status = styled.div<{ status: string }>`
  width: fit-content;
  min-width: 45px;
  text-align: center;
  font-size: 13px;
  padding: 0 5px;
  border-radius: 5px;
  margin: 0 5px;

  ${({ status, theme: { colors, font } }) => css`
    color: ${colors.white};
    font-weight: ${font.weight.semiBold};

    ${status === "1"
      ? `background-color: ${colors.success};`
      : `background-color: ${colors.danger};`};
  `}
`;

interface Checkbox {
  label: string;
  value: string;
}

interface Filter {
  label: string;
  name: string;
  callback: Function;
  options?: Array<Checkbox>;
  preSelected: Checkbox[] | undefined;
}

interface Item {
  label: string;
  value: string;
  setSelected: Function;
  selected: undefined | Checkbox[];
}

const Item: FC<Item> = ({ label, value, setSelected, selected }) => {
  return (
    <Checkbox
      onClick={() => {
        if (selected && selected.find(i => i.value === value)) {
          setSelected(selected.filter(i => i.value !== value));
        } else {
          if (selected) {
            setSelected([{ value, label }, ...selected]);
          } else {
            setSelected([{ value, label }]);
          }
        }
      }}
    >
      <Check
        active={Boolean(selected && selected.find(i => i.value === value))}
      />
      {label}
    </Checkbox>
  );
};

const Dropdown: FC<{
  options?: Array<Checkbox>;
  setSelected: Function;
  selected: Checkbox[] | undefined;
}> = ({ selected, setSelected, options }) => {
  // Grab options and display or filter
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    return () => {
      setFilteredOptions(options);
    };
  }, []);

  return (
    <Container>
      {Array.isArray(filteredOptions) &&
        filteredOptions.map(({ label, value }, i) => (
          <Item
            key={i}
            setSelected={setSelected}
            selected={selected}
            label={label}
            value={value}
          />
        ))}
    </Container>
  );
};

const index: FC<Filter> = ({ label, options, callback, preSelected }) => {
  const [selected, setSelected] = useState<Checkbox[]>();

  useEffect(() => {
    setSelected(preSelected);
  }, [, preSelected]);

  // Handle filter selection
  const handleSelection = (obj: Checkbox[]) => {
    callback(obj);

    // Manipulate the front end on which option was selected
    setSelected(obj);
  };

  const { isOpen, setIsOpen, ref } = useDropdown();

  // Translation
  const { t } = useTranslation();

  return (
    <Filter ref={ref}>
      <Label
        onClick={() => setIsOpen(!isOpen)}
        active={Boolean(selected && selected?.length >= 1)}
      >
        <span>
          {selected && selected?.length > 0
            ? selected?.map(select =>
                select.value === "1" ? (
                  <Status status={select.value}>{t("table:paidStatus")}</Status>
                ) : select.value === "2" ? (
                  <Status status={select.value}>
                    {t("table:unPaidStatus")}
                  </Status>
                ) : (
                  ""
                )
              )
            : label}
        </span>

        {isOpen ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </Label>

      {isOpen && (
        <Dropdown
          selected={selected}
          setSelected={handleSelection}
          options={options}
        />
      )}
    </Filter>
  );
};

export { index as Filters };
