'use strict';

const uuidV4 = require('uuid/v4');

function A(schema, context) {
  if (!schema) return {};
  if (typeof schema === 'function') {
    return schema(context);
  }
  switch (schema.type) {
    case 'string':
      return mockString(schema, context);
    case 'integer':
      return mockInteger(schema, context);
    case 'number':
      return mockNumber(schema, context);
    case 'boolean':
      return mockBoolean(schema, context);
    case 'null':
      return mockNull(schema, context);
    case 'array':
      let r = [];
      const len = (typeof schema.length === 'function') ? schema.length(context) : schema.length;
      for (let i = 0; i < len; i++) {
        r.push(A(schema.items, Object.assign({}, context, { index: i })));
      }
      return r;
    case 'object':
      let obj = {};
      Object.keys(schema.properties).forEach((key) => {
        obj[key] = A(schema.properties[key], context);
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
