// grid-shield/src/domain/ansi/IAnsiFunction.js

/**
 * @interface IAnsiFunction
 * @description
 * Base interface for all ANSI protection functions implemented in GridShield.
 * Defines the required methods that each protection function must implement to ensure consistency, reusability, and integration across the system.
 *
 * Interface base para todas as funções ANSI implementadas no GridShield.
 * Define os métodos obrigatórios que cada função deve implementar para garantir consistência, reutilização e integração em todo o sistema.
 *
 * This interface should not be instantiated directly. Instead, each ANSI function (e.g., 50, 51, 67, etc.) must extend this interface and implement its methods.
 *
 * Esta interface não deve ser instanciada diretamente. Cada função ANSI (ex: 50, 51, 67) deve estendê-la e implementar seus métodos.
 */

class IAnsiFunction {
  constructor() {
    if (this.constructor === IAnsiFunction) {
      throw new Error(
        "IAnsiFunction is an interface and cannot be instantiated directly."
      );
    }
  }

  /**
   * Returns the ANSI code of the function (e.g., "51", "50N", etc.).
   *
   * Retorna o código ANSI da função (ex: "51", "50N", etc.).
   *
   * @returns {string} ANSI function code.
   *                   Código da função ANSI.
   * @abstract
   */
  getCode() {
    throw new Error("Method getCode() must be implemented.");
  }

  /**
   * Returns the descriptive name of the function (e.g., "PhaseOvercurrent").
   *
   * Retorna o nome descritivo da função (ex: "Sobrecorrente Temporizada")
   *
   * @returns {string} ANSI function name.
   *                   Nome da função ANSI.
   * @abstract
   */
  getName() {
    throw new Error("Method getName() must be implemented.");
  }
}
