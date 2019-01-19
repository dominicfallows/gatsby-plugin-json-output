const path = require(`path`);

const { createJsonFiles } = require(`./lib/index`);

const publicPath = path.resolve("./public");

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  delete pluginOptions.plugins;
  createJsonFiles(graphql, publicPath, pluginOptions);
}