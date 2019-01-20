import { IPluginOptions } from "../index";

const checkPluginOpts = (pluginOptions: IPluginOptions): boolean => {
  
  if (typeof pluginOptions === "undefined") {
    throw new Error(`Plugin options should be provided in your \`gatsby-config.js\`.`)
  }

  if (typeof pluginOptions.graphQLQuery !== "string") {
    throw new Error(`\`pluginOptions.graphQLQuery\` should be a GraphQL query string.`)
  }

  if (typeof pluginOptions.pathsMapper !== "function") {
    throw new Error(`\`pluginOptions.pathsMapper\` should be a function of the correct shape.`)
  }

  return true;
};

export default checkPluginOpts;