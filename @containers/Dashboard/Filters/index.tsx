// Core
import { type FC, useState, useEffect, useRef } from "react";

// Styles
import { Filter, Label } from "@styles/Filter";

// Vendors
import styled, { css } from "styled-components";
import { ToggleArrow } from "public/svg";

// Dropdown container
const Container = styled.div`
  width: 240px;
  padding: 10px 0;
  position: absolute;
  top: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
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
    color: ${colors.textColor};
    padding: ${defaults.gutter / 2}rem 10px;

    &:hover {
      background-color: #f1f1f1;
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
    border: 1px solid ${colors.textColor};

    ${active &&
    `
      background: url("data:image/svg+xml,%3Csvg width='18' height='15' viewBox='0 0 15 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.707031 5.70703L4.70703 9.70703' stroke='%23222930' strokeLinecap='round'/%3E%3Cpath d='M13.707 0.707031L4.70703 9.70703' stroke='%23222930' strokeLinecap='round'/%3E%3C/svg%3E")
        2px center no-repeat;

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
        if (selected && selected.find((i) => i.value === value)) {
          setSelected(selected.filter((i) => i.value !== value));
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
        active={Boolean(selected && selected.find((i) => i.value === value))}
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

  // Toggle dropdown
  const [isDropdownActive, setDropdown] = useState<boolean>(false);

  // Hide dropdown when clicked outside it's Ref
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside it's Ref
  const handleClickOutside = (event: { target: any }) => {
    if (
      accountDropdownRef.current &&
      !accountDropdownRef.current.contains(event.target)
    ) {
      setDropdown(false);
    }
  };

  // Detect click outside it's Ref
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Filter ref={accountDropdownRef}>
      <Label
        onClick={() => setDropdown(!isDropdownActive)}
        active={Boolean(selected && selected?.length >= 1)}
      >
        <span>
          {selected && selected?.length > 0
            ? selected?.map((select) =>
                select.value === "1" ? (
                  <Status status={select.value}>Paid</Status>
                ) : select.value === "2" ? (
                  <Status status={select.value}>Unpaid</Status>
                ) : (
                  ""
                )
              )
            : "Please select"}
        </span>

        <ToggleArrow toggled={isDropdownActive} />
      </Label>

      {isDropdownActive && (
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
