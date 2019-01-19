export interface ICheckArgs {
  propKey: string;
  propType: string;
  propValue: any;
  propNotEqualValue?: any;
  packageName: string;
}

const checkArgs = (args: ICheckArgs): boolean => {
  const { propKey, propType, propValue, propNotEqualValue, packageName } = args;

  let error: string | undefined;

  if (typeof propValue !== propType) {
    error = `\`${packageName}\` requires you to pass \`${propKey}\` of type \`${propType}\`. You passed a type of \`${typeof propValue}\``;
  }

  if (typeof propNotEqualValue !== "undefined" && propValue === propNotEqualValue) {
    error = `\`${packageName}\` requires that \`${propKey}\` does not equal \`${propNotEqualValue}\``;
  }

  if (error) {
    throw new Error(error);
  }

  return true;
};

export default checkArgs;