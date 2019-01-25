export interface ICheckArgs {
  propKey: string;
  propType: string;
  propValue: any;
  propNotEqualValue?: any;
}

const checkArgs = (args: ICheckArgs): boolean => {
  const { propKey, propType, propValue, propNotEqualValue } = args;

  let error: string | undefined;

  if (typeof propValue !== propType) {
    error = `\`${propKey}\` should be of type \`${propType}\`. You passed a type of \`${typeof propValue}\`.`;
  }

  if (typeof propNotEqualValue !== "undefined" && propValue === propNotEqualValue) {
    error = `\`${propKey}\` should not equal \`${propNotEqualValue}\`.`;
  }

  if (error) {
    throw new Error(error);
  }

  return true;
};

export default checkArgs;
