
import * as packageJson from "../package.json";

import checkArgs from "./helpers/checkArgs";
import checkPluginOpts from "./helpers/checkPluginOpts";

const packageName = (packageJson as any).name;
const packageVersion = (packageJson as any).version;

export interface IPluginOptions {
  graphQLQuery: string;
}

export const createJsonFiles = (graphql: any, publicPath: string, pluginOptions: IPluginOptions) => {
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

  const graphQLQueryStr = pluginOptions.graphQLQuery;

  console.log({
    graphQLQueryStr,
    packageName,
    packageVersion,
    publicPath,
    "typeof graphql": typeof graphql,
  });
}