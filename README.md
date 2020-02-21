# Gatsby Plugin - JSON Output

Fetch JSON content from Gatsby with API-like static feeds that automatically update with your builds.

1) Can create individual JSON view of each generated static HTML file. For example: `/about/index.html` would also have a `/about/index.json`
2) Can create a set of JSON feed files

## Contents

- [Install](#install)
- [Usage](#usage)
- [Uninstall](#uninstall)

## Install

With NPM:

```bash
npm install gatsby-plugin-json-output
```

With Yarn:

```bash
yarn add gatsby-plugin-json-output
```

## Usage

Setup requires the following being added to your `gatsby-config.js` like below:

```javascript
// gatsby-config.js
const siteUrl = `https://example.com`
plugins: [
  {
    resolve: `gatsby-plugin-json-output`,
    options: {
      siteUrl: siteUrl, // defined on top of plugins
      graphQLQuery: `
        {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
                excerpt
                html
                fields { path }
                frontmatter {
                  title
                  created
                  updated
                }
              }
            }
          }
        }
      `,
      serialize: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
        path: node.fields.path, // MUST contain a path
        title: node.frontmatter.title,
        created: node.frontmatter.created,
        updated: node.frontmatter.updated,
        html: node.html,
      })),
      feedMeta: {
        author: {
          name: author,
        },
        description: siteDescription,
        favicon: `${siteUrl}/icons/icon-48x48.png`,
        title: siteTitle,
      },
      serializeFeed: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
        id: node.fields.path,
        url: siteUrl + node.fields.path,
        title: node.frontmatter.title,
        date_published: new Date(node.frontmatter.created).toISOString(),
        date_modified: new Date(node.frontmatter.updated).toISOString(),
        excerpt: node.excerpt,
      })),
      nodesPerFeedFile: 100,
    }
  }
];
```

### `siteUrl` (required)

This should be a string of your site's URL.

### `graphQLQuery` (required)

This needs to be a Gatsby GraphQL query string, that you would pass to `graphql()`. The result of this query must be an array of objects including the path/slug to each static HTML page and the contents you will use to serialize into a JSON file.

For example, if I wanted to create a JSON file for each of the pages created using [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark), then I might use a query like:

```javascript
{
  allMarkdownRemark(limit: 1000) {
    edges {
      node {
        html
        fields { path }
        frontmatter {
          title
          created
          updated
        }
      }
    }
  }
}
```

The `fields { path }` object having been created by something like [gatsby-source-filesystem/#createfilepath](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#createfilepath).

### `serialize` (optional)

Provide if you want to create individaul JSON files for each node.

This plugin uses this serialize function to structure the contents of the individual JSON files. You can use this function to restructure the nested nature of `graphQLQuery`. This plugin will pass the results object of the `graphQLQuery` to your `serialize` function.

This function must return an array of objects with any structure you'd like your JSON files to be.

The only **required** field is `path` - which must be the relative path from the root of `public` (Gatsby's build output folder) of each static HTML file, like `/about` or `/blog/post-1` etc.

For the example `graphQLQuery` above, you might provide a function like:

```javascript
// Using arrow functions
serialize: results =>
  results.data.allMarkdownRemark.edges.map(({ node }) => ({
    path: node.fields.path, // MUST contain a path
    title: node.frontmatter.title,
    created: node.frontmatter.created,
    updated: node.frontmatter.updated,
    html: node.html
  }));

// Or traditional functions
serialize: function serialize(results) {
  var nodes = [];

  for (var i = 0; i < results.data.allMarkdownRemark.edges.length; i++) {
    var node = results.data.allMarkdownRemark.edges[i].node;

    nodes.push({
      path: node.fields.path, // MUST contain a path
      title: node.frontmatter.title,
      created: node.frontmatter.created,
      updated: node.frontmatter.updated,
      html: node.html
    });

    return nodes;
  }
}
```

### feedMeta (optional)

Provide this to include meta into the JSON feed files. This is an optional object, and can be any key-pair shape. A standard feed meta object might be something like:

```javascript
feedMeta: {
  author: {
    name: "Ex Ample",
  },
  description: "Read all the example blog posts from Ex Ample.",
  favicon: `https://example.com/icons/icon-48x48.png`,
  title: "Ex Ample's Blog",
}
```

### `serializeFeed` (optional

Include this if you want to create JSON feed files.

This plugin uses this serializeFeed function to structure the contents of the JSON feed files. You can use this function to restructure the nested nature of `graphQLQuery`. This plugin will pass the results object of the `graphQLQuery` to your `serializeFeed` function.

This function must return an array of objects with any structure you'd like your JSON feed files to be.

For the example `graphQLQuery` above, you might provide a function like:

```javascript
// Using arrow functions
serializeFeed: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
  id: nodes.field.path
  url: path.join(siteUrl, node.fields.path),
  title: node.frontmatter.title,
  date_published: new Date(node.frontmatter.created).toISOString(),
  date_modified: new Date(node.frontmatter.updated).toISOString(),
  excerpt: node.excerpt,
}))
```

Or, a traditional function like the example in the (serialize)[#serialize] section.

You will find the feed files in the built assets starting from `public/feed-1.json`, then `public/feed-2.json` (etc) as required for the number of posts. For the `feedMata` object and `serialiseFeed` function examples above you would get a JSON feed files in a format like:

```json
{
  "author": {
    "name": "Ex Ample",
  },
  "description": "Read all the example blog posts from Ex Ample.",
  "favicon": "https://example.com/icons/icon-48x48.png",
  "title": "Ex Ample's Blog",
  "feed_url": "https://example.com/feed-1.json",
  "home_page_url": "https://example.com",
  "items": [
    {
      "date_modified": "2019-03-02T00:00:00.000Z",
      "date_published": "2019-03-02T00:00:00.000Z",
      "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ultricies metus, vel hendrerit magna. Nullam iaculis faucibus feugiat. Mauris mollis, est eu congue placerat, ex odio auctor odio, sed viverra mi nulla in orci.",
      "id": "/lorem-ipsum-dolor-sit-amet",
      "title": "Lorem ipsum dolor sit amet",
      "url": "https://example.com/lorem-ipsum-dolor-sit-amet",
    }
  ],
  "next_feed_url": "https://example.com/feed-2.json",
  "previous_feed_url": null,
  "version": "https://jsonfeed.org/version/1"
}
```

### `nodesPerFeedFile` (optional)

This is an optional number (integer) of nodes to include per feed file. Defaults to 100.

## Uninstall

Remove the config from your `gatsby-config.js`, then:

With NPM:

```bash
npm uninstall gatsby-plugin-json-output
```

With Yarn:

```bash
yarn remove gatsby-plugin-json-output
```
