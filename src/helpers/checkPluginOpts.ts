import { IPluginOptions } from "../index";

const checkPluginOpts = (pluginOptions: IPluginOptions, packageName: string): boolean => {
  
  if (typeof pluginOptions === "undefined") {
    throw new Error(`\`${packageName}\` requires plugin options being provided in your \`gatsby-config.js\`. Please see the readme for the \`${packageName}\`.`)
  }

  if (typeof pluginOptions.graphQLQuery !== "string") {
    throw new Error(`\`${packageName}\` requires \`pluginOptions.graphQLQuery\` to be a GraphQL query string. Please see the readme for the \`${packageName}\`.`)
  }

  return true;
};

export default checkPluginOpts;