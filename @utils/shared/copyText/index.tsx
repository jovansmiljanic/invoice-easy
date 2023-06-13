export const copyText = async (text: string | number) => {
  const t = text.toString();

  if (navigator) {
    await navigator.clipboard.writeText(t);
  }
};
