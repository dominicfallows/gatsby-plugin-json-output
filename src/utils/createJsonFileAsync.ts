import { writeFile } from "fs";
import { join, resolve } from "path";

import { ISerializedNode } from "../index";

const createJsonFileAsync = async (siteUrl: string, publicPath: string, node: ISerializedNode): Promise<void> => {
  try {
    const fileObject = {
      $id: `${siteUrl}${join(node.path)}`,
      $schema: "http://json-schema.org/draft-07/schema#",
      ...node
    };
    const fileJson = JSON.stringify(fileObject);

    const filePath = resolve(join(publicPath, node.path, "index.json"));

    await writeFile(filePath, fileJson, err => {
      if (err) {
        console.log(err);
        throw new Error(err.message);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default createJsonFileAsync;
