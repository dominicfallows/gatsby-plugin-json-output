import { IPluginOptions } from "../index";

const checkPluginOpts = (pluginOptions: IPluginOptions): boolean => {
  if (typeof pluginOptions === "undefined") {
    throw new Error(`Plugin options should be provided in your \`gatsby-config.js\`.`);
  }

  if (typeof pluginOptions.siteUrl !== "string" || pluginOptions.siteUrl === "") {
    throw new Error(`\`pluginOptions.siteUrl\` should be a string of your site's URL.`);
  }

  if (typeof pluginOptions.graphQLQuery !== "string" || pluginOptions.graphQLQuery === "") {
    throw new Error(`\`pluginOptions.graphQLQuery\` should be a GraphQL query string.`);
  }

  if (typeof pluginOptions.serialize !== "undefined" && typeof pluginOptions.serialize !== "function") {
    throw new Error(`\`pluginOptions.serialize\` should be a function of the correct structure.`);
  }

  if (typeof pluginOptions.feedMeta !== "undefined" && typeof pluginOptions.feedMeta !== "object") {
    throw new Error(`\`pluginOptions.feedMeta\` should be an object of key/pair values.`);
  }

  if (typeof pluginOptions.serializeFeed !== "undefined" && typeof pluginOptions.serializeFeed !== "function") {
    throw new Error(`\`pluginOptions.serializeFeed\` should be a function of the correct structure.`);
  }

  if (typeof pluginOptions.feedName !== "undefined" && typeof pluginOptions.feedName !== "string") {
    throw new Error(`\`pluginOptions.feedName\` should be a string used to name file and create file path.`);
  }

  if (typeof pluginOptions.nodesPerFeedFile !== "undefined" && typeof pluginOptions.nodesPerFeedFile !== "number") {
    throw new Error(`\`pluginOptions.nodesPerFeedFile\` should be an integer.`);
  }

  return true;
};

export default checkPluginOpts;
