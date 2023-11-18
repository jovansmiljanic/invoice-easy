export const useGetCookie = (name: string): string =>
  // Find cookie by the given name
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
