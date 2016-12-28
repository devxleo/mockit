# mockit
Mock server in your browser.

## Install

```shell
npm install mockit-sw --save-dev
```

## Config

Create a file named `mockit.config.js`. An example is provided below:

```javascript
// mockit.config.js
module.exports = {
  'GET /api/pubs/:pubid': {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string', format: 'name' },
      description: { type: 'string', format: 'lorem' }
    }
  },
  'POST /api/pubs': {
    type: 'object',
    properties: {
      status: { type: 'boolean' },
      created_id: { type: 'string', format: 'uuid' }
    }
  }
};
```

## Run

1. Add a script to your package.json file.

    ```javascript
    // part of package.json
    {
      "scripts": {
        "mock": "mockit"
      }
    }
    ```
    
2. Just run `npm run mock`.
