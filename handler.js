'use strict';

function A(schema) {
  if (!schema) return {};
  switch (schema.type) {
    case 'string':
      return mockString(schema);
    case 'integer':
      return mockInteger(schema);
    case 'number':
      return mockNumber(schema);
    case 'boolean':
      return mockBoolean(schema);
    case 'null':
      return mockNull(schema);
    case 'array':
      let r = [];
      for (let i = 0; i < schema.length; i++) {
        r.push(A(schema.items));
      }
      return r;
    case 'object':
      let obj = {};
      Object.keys(schema.properties).forEach((key) => {
        obj[key] = A(schema.properties[key]);
      });
      return obj;
    default:
      return {};
  }
}

function mockString(schema) {
  return 'this is a string';
}

function mockInteger(schema) {
  return 42;
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
