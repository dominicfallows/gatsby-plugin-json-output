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
      query: ``
    }
  }
]
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