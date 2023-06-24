// Vendors
import styled, { css } from "styled-components";

interface Field {
  hasError?: boolean;
  hasIcon?: boolean;
  info?: boolean;
  type?: string;
  halfSize?: boolean;
}

export const TextArea = styled.textarea`
  outline: 0;
  -webkit-appearance: none;
  margin-top: 7.5px;

  z-index: 1;
  font-size: 16px;
  font-family: inherit;
  width: 100%;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    border: 1px solid ${colors.lightGray};
    font-weight: ${font.weight.medium};
    padding: ${defaults.gutter * 8}px ${defaults.gutter * 15}px;

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }
  `}
`;

export const Field = styled.input<Field>`
  outline: 0;
  -webkit-appearance: none;
  z-index: 0;
  width: 100%;
  border-radius: 5px;

  &:not([type="radio"]) {
    ${({ halfSize }) => {
      return css`
        ${halfSize
          ? css`
              flex: 0 0 50%;
            `
          : `flex: 0 0 100%;
          `}
      `;
    }}

  &[type="select"] {
    margin-right: 10px;
  }

  &[type="checkbox"] {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    padding: 0;

    &:checked {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNC40OSAxMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQuNDkgMTE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTE0LjQ5LDEuMDFjMCwwLjI0LTAuMDksMC40OS0wLjI3LDAuNjhsLTguNSw5Yy0wLjA1LDAuMDUtMC4xLDAuMDktMC4xNSwwLjEzYy0wLjA2LDAuMDQtMC4xMiwwLjA3LTAuMTgsMC4xCgljLTAuMDUsMC4wMi0wLjA5LDAuMDQtMC4xNCwwLjA0QzUuMTYsMTAuOTksNS4wOCwxMSw0Ljk5LDExYy0wLjEzLDAtMC4yNi0wLjAzLTAuMzgtMC4wN2MtMC4xLTAuMDUtMC4yLTAuMTEtMC4yOC0wLjE5CgljLTAuMDEsMC0wLjAxLDAtMC4wMi0wLjAxYy0wLjAxLTAuMDEtMC4wMS0wLjAxLTAuMDItMC4wMmwtNC00Yy0wLjM5LTAuMzktMC4zOS0xLjAyLDAtMS40MWMwLjM5LTAuMzksMS4wMi0wLjM5LDEuNDEsMGwzLjI3LDMuMjcKCWw3LjgtOC4yNWMwLjM4LTAuNDEsMS4wMS0wLjQyLDEuNDEtMC4wNEMxNC4zOSwwLjQ4LDE0LjQ5LDAuNzQsMTQuNDksMS4wMXoiLz4KPC9zdmc+Cg==");
      background-position: center;
      background-size: 13px;
      background-repeat: no-repeat;
    }
  }

  &[type="radio"] {
    margin-right: 10px;
  }

  ${({ theme: { colors, font, defaults }, hasError, hasIcon, info }) => {
    return css`
      border: 1px solid ${colors.lightGray};
      font-weight: ${font.weight.medium};
      padding: ${defaults.gutter * 10}px ${defaults.gutter * 20}px;

      &[type="checkbox"] {
        &:checked {
          background-color: ${colors.black};
        }
      }

      &:focus {
        border: 1px solid ${colors.primary};
      }

      &[disabled] {
        background-color: ${colors.hoverGray};
      }

      ::placeholder {
        font-size: 14px;
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${colors.gray};
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: black;
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: black;
      }

      ${hasError &&
      `
        padding-right: ${info ? "75px" : "40px"};
        border-color: ${colors.danger};
        
      `}

      ${hasIcon &&
      `
        padding-left: ${defaults.gutter * 2}px;
      `}
    `;
  }}
`;
