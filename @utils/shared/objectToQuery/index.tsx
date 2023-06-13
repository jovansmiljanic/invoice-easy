type TQuery = string | string[] | number | undefined;

interface IQuery {
  [x: string]: TQuery;
}

export const objectToQuery = <T,>({ query }: { query: IQuery | T }) => {
  // Handle query if exists
  if (query)
    return Object.entries(query).reduce(
      (prev: string, [key, val]: [string, TQuery]) => {
        let item: string;
        // Check if val is an array and it's empty, do not continue
        if (Array.isArray(val) && val && val.length === 0) return prev;
        // Convert item to a string
        switch (val) {
          case "object":
            item = Array(val).join(", ");
            break;
          default:
            item = val !== undefined ? val.toString() : "";
            break;
        }
        // Check if prev exists
        if (prev) {
          return val !== undefined ? `${prev}&${[key]}=${item}` : `${prev}`;
        }
        // Continue
        return val !== undefined ? `${[key]}=${item}` : ``;
      },
      ``
    );
  return ``;
};
