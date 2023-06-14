import styled, { css } from "styled-components";

const Overdue = styled.div`
  min-width: 70px;
  width: fit-content;
  text-align: center;
  font-size: 15px;
  padding: 0 5px;

  ${({ theme: { font, colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.danger};
    font-weight: ${font.weight.semiBold};
  `}
`;

export const daysLeft = (paymentDeadline: Date, issuedDate: Date) => {
  const timeDiff =
    new Date(paymentDeadline).getTime() - new Date(issuedDate).getTime();

  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    return <Overdue>Overdue</Overdue>;
  }

  if (daysLeft === 1) {
    return <div>{daysLeft} day</div>;
  }

  return <div>{daysLeft} days</div>;
};
