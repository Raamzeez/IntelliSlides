const fetchSetting = (
  key: string,
  standard: any,
  returnType?: "string" | "number",
  includes?: string[]
): string | number => {
  const data = localStorage.getItem(key);
  let returnValue = null;
  if (
    !data ||
    (includes && includes.filter((data) => data === key).length < 1)
  ) {
    returnValue = standard;
  } else {
    returnValue = data;
  }
  if (!returnType || returnType === "string") {
    return returnValue.toString();
  }
  return parseInt(returnValue);
};

export default fetchSetting;
