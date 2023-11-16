// Core types
import { type FC, useContext } from "react";

// GLobal components
import { Button, Heading } from "@components";

// Vendors
import Select from "react-select";
import DatePicker from "react-datepicker";
import styled, { css } from "styled-components";
import { FormikValues, useFormikContext } from "formik";
import useTranslation from "next-translate/useTranslation";

// Core types
import { Client as ClientTypes, Invoice as InvoiceTypes } from "@types";

// Global styles
import { Field } from "@styles/Form";

// Client utils
import { formatDate } from "@utils/client";

// Store context
import { StoreContext } from "@context";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { GridContext } from "@components/MainTable";

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
      z-index: 1;
    }

    * > input {
      padding: 5px 0 !important;
    }

    * {
      font-size: 14px;
      border-radius: 5px !important;
      color: ${colors.textColor} !important;
      background-color: ${colors.background};
      border-color: ${colors.lightGray} !important;
    }

    .css-1dimb5e-singleValue {
      z-index: 10;
      color: ${colors.textColor} !important;
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
  startDate?: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate?: Date | null;
  setEndDate: (date: Date | null) => void;
  deadlineDate?: Date | null;
  setDeadlineDate: (date: Date | null) => void;
  client?: ClientTypes[];
  currentClient?: Partial<ClientTypes>;
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
  invoice,
}) => {
  // Translation
  const { t } = useTranslation();

  const { isModalOpen, setIsModalOpen, modalData, setModalData } =
    useContext(GridContext);

  const { handleBlur, handleChange, values } = useFormikContext<FormikValues>();

  const clientOptions = client?.map(item => {
    return { value: item, label: item.clientName };
  });

  // Handle types
  const handleChangeType = (selected: any) => {
    setModalData(selected.value);
  };

  return (
    <Client>
      <div>
        {modalData ? (
          <>
            <Heading as="h6" weight="bold">
              {modalData.clientName}
            </Heading>
            <Heading as="p">{modalData.clientAddress}</Heading>
            <Heading as="p">
              {modalData.zipCode}, {modalData.city}, {modalData.country}
            </Heading>
            <Heading as="p">
              {t("form:taxNumber")}: {modalData.taxNumber}
            </Heading>
            {modalData.registrationNumber && (
              <Heading as="p">
                {t("form:registrationNumber")}: {modalData.registrationNumber}
              </Heading>
            )}
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
              {t("form:taxNumber")}: {currentClient?.taxNumber}
            </Heading>
            {currentClient?.registrationNumber && (
              <Heading as="p">
                {t("form:registrationNumber")}:{" "}
                {currentClient?.registrationNumber}
              </Heading>
            )}
          </>
        ) : (
          <HelpWrap>
            <CustomSelect
              instanceId="newClient"
              options={clientOptions}
              placeholder={t("invoice:chooseClient")}
              onChange={selected => handleChangeType(selected)}
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
              {t("invoice:addNewClient")}
            </Button>
          </HelpWrap>
        )}
      </div>

      <Wrap>
        <Invoice>
          <Heading as="h5" weight="semiBold">
            {t("invoice:invoice")}:
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
          <Heading as="p">{t("invoice:dateFrom")}:</Heading>

          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            placeholderText={
              invoice ? formatDate(invoice.startDate) : "DD/MM/YYYY"
            }
            dateFormat="dd/MM/yyyy"
          />
        </Date>

        <Date>
          <Heading as="p">{t("invoice:dateTo")}:</Heading>

          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            placeholderText={
              invoice ? formatDate(invoice.endDate) : "DD/MM/YYYY"
            }
            dateFormat="dd/MM/yyyy"
          />
        </Date>

        <Date>
          <Heading as="p">{t("invoice:paymentDeadline")}:</Heading>

          <DatePicker
            selected={deadlineDate}
            onChange={date => setDeadlineDate(date)}
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
