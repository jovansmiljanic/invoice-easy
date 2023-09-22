// Core types
import { type FC, useContext } from "react";

// Nextjs
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Context
import { Next, Prev } from "public/svg";

// Grid context
import { GridContext } from "..";

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid #ebebeb;
  padding-top: 20px;
  padding-bottom: 20px;

  svg {
    cursor: pointer;
  }

  ${({ theme: { defaults, breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      margin-top: ${defaults.gutter / 2}px;
    }
  `}
`;

const Button = styled.button<{ isHidden?: boolean }>`
  cursor: pointer;

  ${({ theme: { defaults, font } }) => css`
    padding: ${defaults.gutter / 4}px ${defaults.gutter / 2}px;
    font-weight: ${font.weight.semiBold};
    border: 0;

    &[disabled] {
      opacity: 0.25;
    }
  `}
`;

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${({ theme: { defaults } }) => css`
    padding-left: ${defaults.gutter / 2}px;
    padding-right: ${defaults.gutter / 2}px;
  `}
`;

const PageNumber = styled.div<{ isActive: boolean; pageColor: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ pageColor, isActive, theme: { defaults, font } }) => css`
    padding: ${defaults.gutter / 4}rem ${defaults.gutter}rem;
    font-weight: ${font.weight.semiBold};
    line-height: 28px;

    ${isActive &&
    `
      color: ${pageColor};
      text-decoration: underline;
    `}

    &:hover {
      color: ${pageColor};
    }

    &:active {
      background-color: ${pageColor};
    }
  `}
`;

const Wrap = styled.div`
  display: flex;
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

const index: FC = () => {
  // Grid context
  const { length, limit, page, queryUrl, searchUrl, updatedItems } =
    useContext(GridContext);

  const { push } = useRouter();

  const scrollUp = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  // Translation
  const { t } = useTranslation();

  return (
    <Pagination>
      <div>
        {t("table:paginationLabel")} {updatedItems.length} of {length}
      </div>

      <Wrap>
        <Button
          disabled={!Boolean(page !== 0)}
          onClick={() => {
            // Change pagination index
            push(`/?${queryUrl}${searchUrl}&page=${page - 1}`);

            scrollUp();
          }}
          isHidden={!Boolean(page !== 0)}
        >
          <Prev />
        </Button>

        <PageNumbers>
          {Array.from(
            Array(Math.ceil(Number(length) / Number(limit))).keys()
          ).map((el) => (
            <PageNumber
              pageColor="#208DD0"
              isActive={el === page}
              key={el}
              onClick={() => {
                push(`/?${queryUrl}&page=${el}${searchUrl}`);

                scrollUp();
              }}
            >
              {el + 1}
            </PageNumber>
          ))}
        </PageNumbers>

        <Button
          disabled={
            !Boolean(
              length > limit && !Boolean(length < (page + 1) * Number(limit))
            )
          }
          onClick={() => {
            // Change pagination index
            push(`/?${queryUrl}${searchUrl}&page=${page + 1}`);

            scrollUp();
          }}
          isHidden={
            !Boolean(
              length > limit && !Boolean(length < (page + 1) * Number(limit))
            )
          }
        >
          <Next />
        </Button>
      </Wrap>
    </Pagination>
  );
};

export { index as Pagination };
