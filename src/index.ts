import * as packageJson from "../package.json";

import checkArgs from "./helpers/checkArgs";
import checkNodes from "./helpers/checkNodes";
import checkPluginOpts from "./helpers/checkPluginOpts";
import { stripTrailingSlash } from "./helpers/strings";

import createJsonFile from "./utils/createJsonFile";

const packageName = (packageJson as any).name;

export interface ISerializedNode {
  [key: string]: any
}

export interface IPluginOptions {
  siteUrl: string;
  graphQLQuery: string;
  serialize: (results: any) => ISerializedNode[];
}

export const createJsonFiles = async (graphql: any, publicPath: string, pluginOptions: IPluginOptions) => {
  console.log("Creating JSON files for matching static HTML files.");

  try {
    checkArgs({
      propKey: "graphql",
      propType: "function",
      propValue: graphql
    });

    checkArgs({
      propKey: "publicPath",
      propNotEqualValue: "",
      propType: "string",
      propValue: publicPath
    });

    checkPluginOpts(pluginOptions);

    const siteUrl = stripTrailingSlash(pluginOptions.siteUrl);
    const graphQLQuery = pluginOptions.graphQLQuery;
    const serialize = pluginOptions.serialize;
    const results = await graphql(graphQLQuery);

    if (results.errors) {
      console.log(results.errors);
      throw new Error(`${packageName} had a problem getting results from GraphQL.`);
    }

    const nodes: ISerializedNode[] = serialize(results);

    checkNodes(nodes);
    
    nodes.map(
      node => createJsonFile(siteUrl, publicPath, node)
    );

    console.log("Finished creating JSON files for matching static HTML files.");

  } catch (err) {
    throw new Error(
      `${packageName} experienced an error, please see below for the error and the README for help.\n` + err
    );
  }
};
