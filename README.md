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
      graphQLQuery: `
        {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
                fields { path }
              }
            }
          }
        }
      `,
      pathsMapper: results => results.data.allMarkdownRemark.edges.map(edge => edge.node.fields.path)
    }
  }
];
```

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

### `pathsMapper`

This needs to be a function that can extract the `path` of each static HTML page, based on your `graphQLQuery`. This plugin will pass the results object of the `graphQLQuery` to your `pathMapper` function.

This function must return an array of strings (an array of the paths).

For the example `graphQLQuery` above, you might provide a function like:

```javascript
// Using arrow functions
pathsMapper: results => results.data.allMarkdownRemark.edges.map(edge => edge.node.fields.path)

// Or traditional functions
pathsMapper: function(results) {
  var paths = [];
  for(var i = 0; i < results.data.allMarkdownRemark.edges.length; i++) {
    var edge = results.data.allMarkdownRemark.edges[i];
    paths.push(edge.node.fields.path);
  }
  return paths;
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
