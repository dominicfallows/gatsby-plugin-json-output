// strip all spaces and new lines
export const stripSpacesNewLines = (str: string) => String(str)
  .replace(/(\r\n|\n|\r)/gm, "")
  .replace(/\s/g, "");