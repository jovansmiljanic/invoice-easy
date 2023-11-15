import useTranslation from "next-translate/useTranslation";
import { lighten } from "polished";
import styled, { css } from "styled-components";

const Status = styled.div<{ status: "warning" }>`
  width: fit-content;
  min-width: 45px;
  text-align: center;
  font-size: 13px;
  padding: 0 5px;
  border-radius: 5px;

  ${({ status, theme: { colors, font } }) => css`
    color: ${colors[status]};
    background-color: ${lighten(0.3, colors[status])};
    font-weight: ${font.weight.semiBold};
  `}
`;

export const daysLeft = (paymentDeadline: Date, issuedDate: Date) => {
  // Translation
  const { t } = useTranslation();

  const timeDiff = new Date(paymentDeadline).getTime() - new Date().getTime();

  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    return <Status status="warning">{t("table:dueDateValue")}</Status>;
  }

  if (daysLeft === 1) {
    return (
      <div>
        {daysLeft} {t("table:dayLeft")}
      </div>
    );
  }

  return (
    <div>
      {daysLeft} {t("table:daysLeft")}
    </div>
  );
};
