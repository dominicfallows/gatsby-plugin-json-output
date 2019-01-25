import { ISerializedNode } from "../index";

const checkNodes = (nodes: ISerializedNode[]): void => {
  if (!Array.isArray(nodes)) {
    throw new Error("The results of your `serialize' function is not an array of objects.");
  }

  if (nodes.length === 0) {
    throw new Error("Your `serialize` function has returned an empty array.");
  }

  nodes.forEach((node: ISerializedNode) => {
    if (typeof node.path !== "string") {
      throw new Error("All nodes created by your `serialize` should contain a valid string `path` field.");
    }
  });
};

export default checkNodes;
