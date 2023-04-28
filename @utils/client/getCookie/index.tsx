export const getCookie = (name: string): string => {
  // Find cookie by the given name
  return (
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
  );
};
