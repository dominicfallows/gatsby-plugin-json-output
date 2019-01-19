const createJsonFiles = require(`./lib`);

exports.onPostBuild = () => {
  createJsonFiles();
}