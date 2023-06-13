export const isObjectEmpty = <T extends Object>(obj: T) =>
  Object.keys(obj).length === 0;
