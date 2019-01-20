# Gatsby Plugin - JSON Output

Creates a JSON view of each generated static HTML file. For example: `/about/index.html` would also have a `/about/index.json`.

## Contents

- [Use-case example](#use-case-example)
- [Install](#install)
- [Usage](#usage)
- [Uninstall](#uninstall)

## Use-case example

TODO

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
plugins: [
  {
    resolve: `gatsby-plugin-json-output`,
    options: {
      siteUrl: `https:\\example.com`,
      graphQLQuery: `
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
      `,
      serialize: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
        path: node.fields.path, // MUST contain a path
        title: node.frontmatter.title,
        created: node.frontmatter.created,
        updated: node.frontmatter.updated,
        html: node.html,
      }))
    }
  }
];
```

### `siteUrl`

This should be a string of your site's URL.

### `graphQLQuery`

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

### `serialize`

This plugin uses this serialize function to structure the contents of the JSON files. You can use this function to restructure the nested nature of `graphQLQuery`. This plugin will pass the results object of the `graphQLQuery` to your `serialize` function.

This function must return an array of objects with any structure you'd like your JSON files to be.

The only **required** field is `path` - which must be the relative path from the root of `public` (Gatsby's build output folder) of each static HTML file, like `/about` or `/blog/post-1` etc.

For the example `graphQLQuery` above, you might provide a function like:

```javascript
// Using arrow functions
serialize: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
  path: node.fields.path, // MUST contain a path
  title: node.frontmatter.title,
  created: node.frontmatter.created,
  updated: node.frontmatter.updated,
  html: node.html,
}))

// Or traditional functions
serialize: function serialize(results) {
  var nodes = [];
  
  for(var i = 0; i < results.data.allMarkdownRemark.edges.length; i++) {
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
