import { IPluginOptions } from "../..";
import checkPluginOpts from "../checkPluginOpts";

const mockPluginSettings: IPluginOptions = {
  graphQLQuery: `{ query() {} }`,
  serialize: results => results.map((node: any) => node),
  siteUrl: "https://example.com"
};

test("checkPluginOpts accepts correct shape", () => {
  expect(checkPluginOpts(mockPluginSettings)).toBe(true);
})

test("checkPluginOpts detects missing config", () => {
  expect(() => {
    checkPluginOpts(undefined as any);
  }).toThrow("Plugin options should be provided in your `gatsby-config.js`.");
});

test("checkPluginOpts detects missing or incorrect `siteUrl`", () => {
  const expectedErr = "`pluginOptions.siteUrl` should be a string of your site's URL.";

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, siteUrl: undefined } as any);
  }).toThrow(expectedErr);

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, siteUrl: "" } as any);
  }).toThrow(expectedErr);

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, siteUrl: 1234 } as any);
  }).toThrow(expectedErr);
});

test("checkPluginOpts detects missing or incorrect `graphQLQuery`", () => {
  const expectedErr = "`pluginOptions.graphQLQuery` should be a GraphQL query string.";

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, graphQLQuery: undefined } as any);
  }).toThrow(expectedErr);

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, graphQLQuery: "" } as any);
  }).toThrow(expectedErr);

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, graphQLQuery: 1234 } as any);
  }).toThrow(expectedErr);
});

test("checkPluginOpts detects missing or incorrect `serialize`", () => {
  const expectedErr = "`pluginOptions.serialize` should be a function of the correct structure.";

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, serialize: undefined } as any);
  }).toThrow(expectedErr);

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, serialize: "" } as any);
  }).toThrow(expectedErr);

  expect(() => {
    checkPluginOpts({ ...mockPluginSettings, serialize: 1234 } as any);
  }).toThrow(expectedErr);
});