// src/errors/IllegalStateException.js

"use strict";

const ApplicationException = require("./ApplicationException");

class IllegalStateException extends ApplicationException {
  constructor(parameter) {
    super(`${parameter} is not valid.`);
  }
}

module.exports = IllegalStateException;
