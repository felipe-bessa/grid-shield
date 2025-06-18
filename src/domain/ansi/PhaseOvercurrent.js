// grid-shield/src/domain/ansi/PhaseOvercurrent.js

/**
 * @abstract
 * @class PhaseOvercurrent
 * @extends IAnsiFunction
 * @description
 * Abstract base class for all phase overcurrent protection functions in GridShield.
 * Provides common structure and shared parameters such as threshold current, curve type, and time setting.
 * This class should not be instantiated directly. Instead, specific ANSI functions like 50 or 51 must extend this class and implement their own logic.
 *
 * Classe base abstrata para todas as funções de proteção de sobrecorrente de fase no GridShield.
 * Fornece estrutura comum e parâmetros compartilhados como corrente de limiar, tipo de curva e ajuste de tempo.
 * Esta classe não deve ser instanciada diretamente. Funções ANSI específicas como 50 ou 51 devem estendê-la e implementar sua própria lógica.
 */

"use strict";

const IAnsiFunction = require("./IAnsiFunction");

class PhaseOvercurrent extends IAnsiFunction {
  /**
   * @constructor
   * @param {Object} params - Configuration parameters.
   * @param {number} params.thresholdCurrent - Current threshold for operation.
   *                                           Corrente de limiar para atuação.
   * @param {string} params.curveType - Type of time-current characteristic curve (e.g., IEC_STANDARD).
   *                                    Tipo de curva tempo-corrente (ex: IEC_STANDARD).
   * @param {number} params.timeSetting - Time setting or dial for the curve.
   *                                      Ajuste de tempo ou dial da curva.
   */
  constructor({ thresholdCurrent, curveType, timeSetting }) {
    super();
    if (new.target === PhaseOvercurrent) {
      throw new Error(
        "PhaseOvercurrent is an abstract class and cannot be instantiated."
      );
    }

    this._thresholdCurrent = thresholdCurrent;
    this._curveType = curveType;
    this._timeSetting = timeSetting;
  }

  /**
   * @abstract
   * @returns {number} Threshold current value.
   *                   Valor da corrente de limiar.
   */
  get thresholdCurrent() {
    throw new Error(
      "Abstract getter 'thresholdCurrent' must be overridden by subclass."
    );
  }

  /**
   * @abstract
   * @returns {string} Curve type identifier.
   *                   Identificador do tipo de curva.
   */
  get curveType() {
    throw new Error(
      "Abstract getter 'curveType' must be overridden by subclass."
    );
  }

  /**
   * @abstract
   * @returns {number} Time setting or dial.
   *                   Ajuste de tempo ou dial.
   */
  get timeSetting() {
    throw new Error(
      "Abstract getter 'timeSetting' must be overridden by subclass."
    );
  }
}

module.exports = PhaseOvercurrent;
