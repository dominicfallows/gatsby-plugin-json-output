import { writeFileSync } from "fs";
import { join } from "path";

import * as packageJson from "../package.json";

import checkArgs from "./helpers/checkArgs";
import checkNodes from "./helpers/checkNodes";
import checkPluginOpts from "./helpers/checkPluginOpts";
import { stripTrailingSlash } from "./helpers/strings";

import createJsonFileAsync from "./utils/createJsonFileAsync";

const packageName = (packageJson as any).name;

export interface ISerializedNode {
  [key: string]: any;
}

export interface IPluginOptions {
  siteUrl: string;
  graphQLQuery: string;
  serialize?: (results: any) => ISerializedNode[];
  feedMeta?: { [key: string]: any };
  serializeFeed?: (results: any) => ISerializedNode[];
  feedName?: string;
  nodesPerFeedFile?: number;
}

const checkPluginOptions = async ({
  graphql,
  publicPath,
  pluginOptions
}: {
  graphql: any;
  publicPath: string;
  pluginOptions: IPluginOptions;
}) => {
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
  } catch (err) {
    throw new Error(
      `${packageName} experienced an error, please see below for the error and the README for help.\n` + err
    );
  }
};

const createJsonFiles = async ({
  nodes,
  siteUrl,
  publicPath
}: {
  nodes: ISerializedNode[];
  siteUrl: string;
  publicPath: string;
}) => {
  console.log("Creating individual JSON files from graphql query");

  try {
    await Promise.all(nodes.map((node) => createJsonFileAsync(siteUrl, publicPath, node)));
    console.log("Finished creating individual JSON files from graphql query");
  } catch (err) {
    throw new Error(
      `${packageName} experienced an error, please see below for the error and the README for help.\n` + err
    );
  }
};

const createJsonFeedFiles = async ({
  feedMeta,
  siteUrl,
  nodes,
  nodesPerFeedFile = 100,
  feedName = 'feed',
  publicPath
}: {
  feedMeta?: { [key: string]: any };
  siteUrl: string;
  nodes: ISerializedNode[];
  nodesPerFeedFile?: number;
  feedName?: string;
  publicPath: string;
}) => {
  console.log("Creating JSON feed files from graphql query");

  try {
    // make a copy of the nodes object, so we don't chunk the original
    const nodesToChunk: ISerializedNode[] = [...nodes];

    // create chunks for feed files
    const nodeChunks: ISerializedNode[] = [];
    while (nodesToChunk.length) {
      nodeChunks.push(nodesToChunk.splice(0, nodesPerFeedFile));
    }

    // create feed file promises
    const feedPromises: Promise<void>[] = [];
    nodeChunks.forEach((nodeChunk: ISerializedNode, i: number) => {
      feedPromises.push(
        new Promise((resolve, reject) => {
          try {
            const jsonFeed = {
              ...feedMeta,
              feed_url: `${siteUrl}/${feedName}-1.json`,
              home_page_url: siteUrl,
              items: nodeChunk,
              next_feed_url: i < nodeChunks.length - 1 ? `${siteUrl}/${feedName}-${i + 2}.json` : null,
              previous_feed_url: i > 0 ? `${siteUrl}/${feedName}-${i}.json` : null,
              version: "https://jsonfeed.org/version/1"
            };
            writeFileSync(join(publicPath, `${feedName}-${i + 1}.json`), JSON.stringify(jsonFeed), "utf8");
            resolve();
          } catch (err) {
            reject(err);
          }
        })
      );
    });

    // run all feed file promises
    await Promise.all(feedPromises);

    console.log("Finished creating JSON feed files from graphql query");
  } catch (err) {
    throw new Error(
      `${packageName} experienced an error, please see below for the error and the README for help.\n` + err
    );
  }
};

export const start = async (graphql: any, publicPath: string, pluginOptions: IPluginOptions) => {
  try {
    // Check plugin options
    checkPluginOptions({ graphql, publicPath, pluginOptions });

    // Run graphql query and serialise nodes
    const siteUrl = stripTrailingSlash(pluginOptions.siteUrl);
    const { graphQLQuery, serialize, feedMeta, serializeFeed, feedName, nodesPerFeedFile } = pluginOptions;

    if (!serialize && !serializeFeed) {
      console.log(`No \`serialize\` or \`serializeFeed\` functions passed to ${packageName}, nothing  to do.`);
      return;
    }

    const results = await graphql(graphQLQuery);

    if (results.errors) {
      console.log(results.errors);
      throw new Error(`${packageName} had a problem getting results from GraphQL.`);
    }

    // Create individual JSON files from graphql query
    if (serialize) {
      const nodes: ISerializedNode[] = serialize(results);
      checkNodes(nodes);
      await createJsonFiles({ nodes, siteUrl, publicPath });
    }

    // Create JSON feed files from graphql query
    if (serializeFeed) {
      const nodesForFeed: ISerializedNode[] = serializeFeed(results);
      checkNodes(nodesForFeed, true);
      await createJsonFeedFiles({ feedMeta, nodes: nodesForFeed, nodesPerFeedFile, feedName, siteUrl, publicPath });
    }
  } catch (err) {
    throw new Error(
      `${packageName} experienced an error, please see below for the error and the README for help.\n` + err
    );
  }
};
