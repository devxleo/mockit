'use strict';

const handler = require('./handler');
const Router = require('./router');
const config = require('mockit.config.js');

const router = new Router();
const pathRegexp = /^https?:\/\/.+?(\/api\/.+)$/;

Object.keys(config).forEach((key) => {
  const [method, path] = key.split(' ');
  const schema = config[key];
  router.use(method, path, schema);
});

self.addEventListener('fetch', function (event) {
  const method = event.request.method;
  const path = getPath(event.request.url);
  if (path) {
    const re = router.match(method, path);
    if (re) {
      const resp = new Response(
        JSON.stringify(handler(re.schema, re.query)),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      event.respondWith(resp);
      return;
    }
  }
  event.respondWith(fetch(event.request));
});

function getPath(url) {
  const r = pathRegexp.exec(url);
  if (!r) return null;
  return r[1];
}
