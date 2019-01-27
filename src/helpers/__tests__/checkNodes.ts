// import { ISerializedNode } from "../..";
import checkNodes from "../checkNodes";

/* const mockNodes: ISerializedNode[] = [
  { path: "/some/path" }
]; */

test("checkNodes detects missing or incorrect type of `nodes`", () => {
  const expectedErr = "The results of your `serialize' function is not an array of objects.";

  expect(() => {
    checkNodes(undefined  as any);
  }).toThrow(expectedErr);

  expect(() => {
    checkNodes(1234 as any);
  }).toThrow(expectedErr);
});

test("checkNodes detects empty `nodes` array", () => {
  const expectedErr = "Your `serialize` function has returned an empty array.";

  expect(() => {
    checkNodes([]);
  }).toThrow(expectedErr);
});

test("checkNodes detects item with missing `path` in `nodes` array", () => {
  const expectedErr = "All nodes created by your `serialize` should contain a valid string `path` field.";

  expect(() => {
    checkNodes([{
      notPathKey: "/some/path"
    }]);
  }).toThrow(expectedErr);
});