// Core types
import { useContext, type FC } from "react";

// GLobal components
import { Button, Heading } from "@components";

// Vendors
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useFormikContext } from "formik";
import styled, { css } from "styled-components";

// Core types
import { Client as ClientTypes, Invoice as InvoiceTypes } from "@types";

// Global styles
import { Field } from "@styles/Form";

// Client utils
import { formatDate } from "@utils/client";
import { StoreContext } from "@context";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Client = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px 15px;
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`;

const Date = styled.div`
  display: flex;
  align-items: center;

  ${({ theme: { colors, breakpoints } }) => css`
    .react-datepicker-wrapper {
      margin: 5px 0;

      input {
        padding: 2px 6px;
        color: ${colors.textColor};
        background-color: ${colors.background} !important;
        border: 1px solid ${colors.lightGray};
        border-radius: 5px;

        &::placeholder {
          color: ${colors.lightGray};
        }
      }
    }
  `}

  p {
    width: 100%;
    margin-right: 10px;
  }

  input {
    font-size: 14px;
  }
`;

const CustomSelect = styled(Select)`
  width: 235px;

  ${({ theme: { colors } }) => css`
    #react-select-newClient-placeholder {
      color: ${colors.textColor};
      z-index: 1;
    }

    * > input {
      padding: 5px 0 !important;
    }

    * {
      background-color: ${colors.background};
      font-size: 14px;
      border-radius: 5px !important;
      border-color: ${colors.lightGray} !important;
    }
  `}
`;

const Invoice = styled.div`
  display: flex;
  align-items: center;

  h5 {
    width: 43%;
  }

  input {
    flex: 0 0 30% !important;
    padding: 5px 10px !important;
    font-size: 14px;
  }
`;

const Wrap = styled.div`
  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      margin-top: 20px;
    }
  `}
`;

const HelpWrap = styled.div`
  width: 235px;

  button {
    width: 100%;
  }
`;

interface Client {
  startDate: any;
  endDate: any;
  deadlineDate: any;
  setStartDate: any;
  setEndDate: any;
  setDeadlineDate: any;
  client?: ClientTypes[];
  currentClient?: Partial<ClientTypes>;
  values: any;
  invoice?: InvoiceTypes;
}

const index: FC<Client> = ({
  startDate,
  endDate,
  deadlineDate,
  setStartDate,
  setEndDate,
  setDeadlineDate,
  client,
  currentClient,
  values,
  invoice,
}) => {
  const { isModalOpen, setIsModalOpen, setIsClientData, isClientData } =
    useContext(StoreContext);

  const { handleBlur, handleChange } = useFormikContext();

  const clientOptions = client?.map((item) => {
    return { value: item, label: item.clientName };
  });

  // Handle types
  const handleChangeType = (e: any) => {
    setIsClientData(e.value);
  };

  return (
    <Client>
      <div>
        {isClientData ? (
          <>
            <Heading as="h6" weight="bold">
              {isClientData.clientName}
            </Heading>
            <Heading as="p">{isClientData.clientAddress}</Heading>
            <Heading as="p">
              {isClientData.zipCode}, {isClientData.city},{" "}
              {isClientData.country}
            </Heading>
            <Heading as="p">Davčna številka: {isClientData.taxNumber}</Heading>
          </>
        ) : currentClient ? (
          <>
            <Heading as="h6" weight="bold">
              {currentClient?.clientName}
            </Heading>
            <Heading as="p">{currentClient?.clientAddress}</Heading>
            <Heading as="p">
              {currentClient?.zipCode}, {currentClient?.city},{" "}
              {currentClient?.country}
            </Heading>
            <Heading as="p">
              Davčna številka: {currentClient?.taxNumber}
            </Heading>
          </>
        ) : (
          <HelpWrap>
            <CustomSelect
              instanceId="newClient"
              options={clientOptions}
              placeholder="Choose existing one"
              onChange={(e: any) => handleChangeType(e)}
              onBlur={handleBlur}
            />

            <div>or</div>

            <Button
              variant="secondary"
              type="button"
              size="small"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <AddOutlinedIcon />
              Add new client
            </Button>
          </HelpWrap>
        )}
      </div>

      <Wrap>
        <Invoice>
          <Heading as="h5" weight="semiBold">
            Invoice:
          </Heading>

          <Field
            type="number"
            name="invoiceNumber"
            placeholder="0"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.invoiceNumber}
          />
        </Invoice>

        <Date>
          <Heading as="p">Date from:</Heading>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText={
              invoice ? formatDate(invoice.startDate) : "DD/MM/YYYY"
            }
            dateFormat="dd/MM/yyyy"
          />
        </Date>

        <Date>
          <Heading as="p">Date to:</Heading>

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText={
              invoice ? formatDate(invoice.endDate) : "DD/MM/YYYY"
            }
            dateFormat="dd/MM/yyyy"
          />
        </Date>

        <Date>
          <Heading as="p">Payment deadline:</Heading>

          <DatePicker
            selected={deadlineDate}
            onChange={(date) => setDeadlineDate(date)}
            placeholderText={
              invoice ? formatDate(invoice.paymentDeadline) : "DD/MM/YYYY"
            }
            dateFormat="dd/MM/yyyy"
          />
        </Date>
      </Wrap>
    </Client>
  );
};

export { index as ClientDetails };
