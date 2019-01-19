
import * as packageJson from "../package.json";

import checkArgs from "./helpers/checkArgs";
import checkPluginOpts from "./helpers/checkPluginOpts";

const packageName = (packageJson as any).name;
const packageVersion = (packageJson as any).version;

export interface IPluginOptions {
  graphQLQuery: string;
}

export const createJsonFiles = async (graphql: any, publicPath: string, pluginOptions: IPluginOptions) => {
  console.log("Creating JSON files for matching static HTML files");

  checkArgs({
    packageName,
    propKey: "graphql",
    propType: "function",
    propValue: graphql
  });

  checkArgs({
    packageName,
    propKey: "publicPath",
    propNotEqualValue: "",
    propType: "string",
    propValue: publicPath
  });

  checkPluginOpts(pluginOptions, packageName);

  const graphQLQuery = pluginOptions.graphQLQuery;
  const results = await graphql(graphQLQuery);

  if (results.errors) {
    console.log(results.errors);
    throw new Error(`${packageName} had a problem getting results from GraphQL`);
  }

  console.log({
    graphQLQuery,
    packageName,
    packageVersion,
    publicPath,
    results,
    "typeof graphql": typeof graphql,
  });
}