// src/errors/MissingParametersException.js

/**
 * @file MissingParametersException.js
 * @description
 * Exception thrown when a required parameter is missing in the GridShield system.
 *
 * This class extends ApplicationException and is used to indicate that a specific
 * parameter was expected but not provided during execution.
 *
 * Exceção lançada quando um parâmetro obrigatório está ausente no sistema GridShield.
 * Esta classe estende ApplicationException e é usada para indicar que um parâmetro
 * específico era esperado, mas não foi fornecido durante a execução.
 *
 * @class MissingParametersException
 * @extends ApplicationException
 * @param {string} parameter - The name or description of the missing parameter
 */

"use strict";

const ApplicationException = require("./ApplicationException");

class MissingParametersException extends ApplicationException {
  constructor(parameter) {
    super(`${parameter} is missing.`);
  }
}

module.exports = MissingParametersException;
