'use strict';

const uuidV4 = require('uuid/v4');

function A(schema, query) {
  if (!schema) return {};
  switch (schema.type) {
    case 'string':
      return mockString(schema, query);
    case 'integer':
      return mockInteger(schema, query);
    case 'number':
      return mockNumber(schema, query);
    case 'boolean':
      return mockBoolean(schema, query);
    case 'null':
      return mockNull(schema, query);
    case 'array':
      let r = [];
      const len = (typeof schema.length === 'function') ? schema.length(query) : schema.length;
      for (let i = 0; i < len; i++) {
        r.push(A(schema.items, query));
      }
      return r;
    case 'object':
      let obj = {};
      Object.keys(schema.properties).forEach((key) => {
        obj[key] = A(schema.properties[key], query);
      });
      return obj;
    default:
      return {};
  }
}

function mockString(schema) {
  switch (schema.format) {
    case 'url':
      return 'http://www.chocyt.com';
    case 'uuid':
      return uuidV4();
    case 'username':
      return 'devxleo';
    case 'email':
      return 'devxleo@gmail.com'
    default:
      return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
  }
}

function mockInteger(schema) {
  const min = schema.min || 0;
  const max = schema.max || 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

function mockNumber(schema) {
  return 23.23;
}

function mockBoolean(schema) {
  return false;
}

function mockNull(schema) {
  return null;
}

module.exports = A;
