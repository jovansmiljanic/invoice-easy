export const ToggleArrow = ({ toggled }: { toggled: boolean }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {toggled ? (
        <>
          <path
            d="M23.2269 12.2285L12.2109 1.21251"
            stroke="#272E37"
            strokeLinecap="round"
          />
          <path
            d="M1.19482 12.2285L12.2108 1.21251"
            stroke="#272E37"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M1.19445 1.21289L12.2104 12.2289"
            stroke="#272E37"
            strokeLinecap="round"
          />
          <path
            d="M23.2266 1.21289L12.2106 12.2289"
            stroke="#272E37"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
};
