// src/erros/ApplicationException.js

/**
 * @file ApplicationException.js
 * @description
 * Base class for all custom exceptions in the GridShield system.
 *
 * This abstract exception class extends the native JavaScript Error class
 * and provides a consistent structure for all domain-specific errors.
 *
 * It captures the stack trace and sets the error name dynamically based on
 * the subclass that extends it.
 *
 * Classe base para todas as exceções personalizadas no sistema GridShield.
 * Estende a classe nativa Error do JavaScript e fornece uma estrutura
 * consistente para erros específicos do domínio.
 *
 * A pilha de execução é capturada automaticamente e o nome da exceção
 * é definido dinamicamente com base na subclasse que a estende.
 *
 * @class ApplicationException
 * @extends Error
 * @param {string} [message=""] - Optional error message
 */

"use strict";

class ApplicationException extends Error {
  constructor(message = "") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApplicationException;
