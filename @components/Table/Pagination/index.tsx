// Core types
import { useContext, type FC } from "react";

// Nextjs
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";

// Context
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
  justify-content: center;
  flex: 1;

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

const index: FC = () => {
  // Grid context
  const { length, limit, page, queryUrl, searchUrl } = useContext(GridContext);

  const { push } = useRouter();

  const scrollUp = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  return (
    <Pagination>
      <Button
        disabled={!Boolean(page !== 0)}
        onClick={() => {
          // Change pagination index
          push(`/?${queryUrl}${searchUrl}&page=${page - 1}`);

          scrollUp();
        }}
        isHidden={!Boolean(page !== 0)}
      >
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.999763 20.0029C0.999763 30.4963 9.50635 39.0029 19.9998 39.0029C30.4932 39.0029 38.9998 30.4963 38.9998 20.0029C38.9998 9.50952 30.4932 1.00293 19.9998 1.00293C9.50635 1.00293 0.999763 9.50952 0.999763 20.0029Z"
            stroke="#208DD0"
            strokeWidth="2"
          />
          <path
            d="M23.0291 13L16.0001 19.99"
            stroke="#208DD0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16.0001 19.9512L23.0291 26.9412"
            stroke="#208DD0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
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
        style={{ marginLeft: "auto" }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 39C30.4934 39 39 30.4934 39 20C39 9.50659 30.4934 1 20 1C9.50659 1 1 9.50659 1 20C1 30.4934 9.50659 39 20 39Z"
            stroke="#208DD0"
            strokeWidth="2"
          />
          <path
            d="M17 13L23.99 20.029"
            stroke="#208DD0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 26.9802L23.99 19.9512"
            stroke="#208DD0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Button>
    </Pagination>
  );
};

export { index as Pagination };
