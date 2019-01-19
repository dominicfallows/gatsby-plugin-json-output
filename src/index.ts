import * as packageJson from "../package.json";

const packageVersion = (packageJson as any).version;

const createJsonFiles = () => {
  console.log("createJsonFiles packageVersion", packageVersion);
}