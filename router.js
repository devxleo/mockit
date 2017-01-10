'use strict';

const pathToRegexp = require('path-to-regexp');
const qs = require('querystring');

class Router {
  
  constructor() {
    this._routes = {};
  }
  
  use(method, url, schema) {
    
    const [path, query] = splitPath(url);
    
    if (!this._routes[method]) {
      this._routes[method] = [];
    }
    
    this._routes[method].push({
      path: pathToRegexp(path),
      query: query ? qs.parse(query) : null,
      schema: schema
    });
    
  }
  
  match(method, url) {
    
    const arr = this._routes[method];
    if (!arr) return null;
    
    const [path, query] = splitPath(url);
    let schema = null;
    let queryToMatch = null;
    const isMatch = arr.some((route) => {
      if (!route.path.test(path)) return false;
      queryToMatch = query ? qs.parse(query) : null;
      if (!testQuery(route.query, queryToMatch)) return false;
      schema = route.schema;
      return true;
    });
    
    return isMatch ? {schema: schema, query: queryToMatch} : null;
  }
  
}

function splitPath(path) {
  const i = path.lastIndexOf('?');
  const p = i !== -1 ? path.slice(0, i) : path;
  const q = i !== -1 ? path.slice(i + 1) : null;
  return [p, q];
}

function testQuery(target, query) {
  if (!target) return true;
  if (!query) return false;
  return Object.keys(target).every((key) => {
    if (!target[key]) return true;
    if (target[key] === query[key]) return true;
    return false;
  });
}

module.exports = Router;
