// src/errors/IllegalArgumentException.js

/**
 * @file IllegalArgumentException.js
 * @description
 * Exception thrown when a method receives an invalid argument in the GridShield system.
 *
 * This class extends ApplicationException and is used to indicate that a specific
 * parameter does not meet the expected criteria or constraints.
 *
 * Exceção lançada quando um método recebe um argumento inválido no sistema GridShield.
 * Esta classe estende ApplicationException e é usada para indicar que um parâmetro
 * específico não atende aos critérios ou restrições esperadas.
 *
 * @class IllegalArgumentException
 * @extends ApplicationException
 * @param {string} parameter - The name or description of the invalid parameter
 */

"use strict";

const ApplicationException = require("./ApplicationException");

class IllegalArgumentException extends ApplicationException {
  constructor(parameter) {
    super(`${parameter} is not valid.`);
  }
}

module.exports = IllegalArgumentException;
