// src/domain/ansi51.js

/**
 * @class ANSI51
 * @classdesc
 * Calculates settings for Time Delayed Overcurrent Protection (ANSI 51)
 *
 * Calcula os ajustes para proteções temporizadas de fase (ANSI 51)
 */

"use strict";

class ANSI51 {
  /**
   * Creates an instance of ANSI51
   *
   * Cria uma instância de objeto ANSI51
   * @param {number} demand - The power demand in kilowatts (kW).
   *                        - A demanda de potência em kilowatts (kW).
   * @param {number} voltageLevel - The voltage level supply in kilovolts (kV).
   *                              - O nível de tensão da rede em kilovolts (kV).
   * @param {number} powerFactor [powerFactor=0.92] - The power factor (default is 0.92).
   *                                                - O fator de potência (padrão é 0.92).
   */
  constructor(demand, voltageLevel, powerFactor = 0.92) {
    this._demand = demand;
    this._voltageLevel = voltageLevel;
    this._powerFactor = powerFactor;
  }

  /**
   * Calculates the nominal current for a three-phase system.
   *
   * Calcula a corrente nominal de fase de um sistema trifásico.
   *
   * @returns {number} The nominal current in amperes, rounded to two decimal places.
   *                   A corrente nominal em àmperes, com precisão de duas casas decimais.
   */
  getNominalCurrent() {
    const nominalCurrent = Number(
      parseFloat(
        this._demand / (Math.sqrt(3) * this._voltageLevel * this._powerFactor)
      ).toFixed(2)
    );
    return nominalCurrent;
  }
}

module.exports = ANSI51;
