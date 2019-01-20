import { IPluginOptions } from "../index";

const checkPluginOpts = (pluginOptions: IPluginOptions): boolean => {
  
  if (typeof pluginOptions === "undefined") {
    throw new Error(`Plugin options should be provided in your \`gatsby-config.js\`.`)
  }

  if (typeof pluginOptions.siteUrl !== "string" || pluginOptions.siteUrl === "") {
    throw new Error(`\`pluginOptions.siteUrl\` should be a string of your site's URL.`)
  }

  if (typeof pluginOptions.graphQLQuery !== "string") {
    throw new Error(`\`pluginOptions.graphQLQuery\` should be a GraphQL query string.`)
  }

  if (typeof pluginOptions.serialize !== "function") {
    throw new Error(`\`pluginOptions.serialize\` should be a function of the correct structure.`)
  }

  return true;
};

export default checkPluginOpts;