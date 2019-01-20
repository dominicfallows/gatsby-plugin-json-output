import { stripSpacesNewLines, stripTrailingSlash } from "../strings";

test("stripSpacesNewLines does what it says on the tin", () => {
  const strWithSpacesAndNewLines = `
    {
      name: "adam"
    }
  `;
  expect(stripSpacesNewLines(strWithSpacesAndNewLines)).toBe(`{name:"adam"}`);
});

test("stripTrailingSlash does what it says on the tin", () => {
  expect(stripTrailingSlash("http://example.com/")).toBe("http://example.com");
});
