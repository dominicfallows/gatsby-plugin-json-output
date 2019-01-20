import * as packageJson from "../package.json";

import checkArgs from "./helpers/checkArgs";
import checkPluginOpts from "./helpers/checkPluginOpts";
import { stripSpacesNewLines } from "./helpers/strings";

const packageName = (packageJson as any).name;
const packageVersion = (packageJson as any).version;

export interface IPluginOptions {
  graphQLQuery: string;
  pathsMapper: (data: any) => string[];
}

export const createJsonFiles = async (graphql: any, publicPath: string, pluginOptions: IPluginOptions) => {
  console.log("Creating JSON files for matching static HTML files");

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

    const graphQLQuery = stripSpacesNewLines(pluginOptions.graphQLQuery);
    const pathsMapper = pluginOptions.pathsMapper;
    const results = await graphql(graphQLQuery);

    if (results.errors) {
      console.log(results.errors);
      throw new Error(`${packageName} had a problem getting results from GraphQL.`);
    }

    const paths: string[] = pathsMapper(results);

    if (!Array.isArray(paths)) {
      throw new Error("The result of your provided `pathMapper' function is not an array of strings.");
    }

    if(paths.length === 0) {
      throw new Error("`pathsMapper` has returned an empty array when processing your `graphQLQuery`.");
    }

    console.log({
      graphQLQuery,
      packageName,
      packageVersion,
      paths,
      publicPath,
      results,
      "typeof graphql": typeof graphql,
      "typeof paths": typeof paths,
      "typeof pathsMapper": typeof pathsMapper
    });

  } catch (err) {
    throw new Error(
      `${packageName} experienced an error, please see below for the error and the README for help.\n` + err
    );
  }
};
