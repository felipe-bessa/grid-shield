// src/domain/devices/PowerTransformer.js

"use strict";

const MissingParametersException = require("../../errors/MissingParametersException");
const IllegalArgumentException = require("../../errors/IllegalArgumentException");

class PowerTransformer {
  static #ratedPowerValues = [
    30, 45, 75, 112.5, 150, 225, 300, 500, 750, 1000, 1500, 2000, 2500, 3000,
  ];

  static #highVoltageLevels = [13.8, 22.0, 34.5];

  constructor(
    ratedPower,
    highVoltageLevel,
    impedance = 5.0,
    irushRatio = 8.0,
    irushDelay = 0.1
  ) {
    if (!ratedPower) {
      throw new MissingParametersException("ratedPower");
    }

    if (!highVoltageLevel) {
      throw new MissingParametersException("highVoltageLevel");
    }

    if (!PowerTransformer.#ratedPowerValues.includes(ratedPower)) {
      throw new IllegalArgumentException("ratedPower");
    }

    if (!PowerTransformer.#highVoltageLevels.includes(highVoltageLevel)) {
      throw new IllegalArgumentException("highVoltageLevel");
    }

    if (impedance < 1 || impedance > 7) {
      throw new IllegalArgumentException("impedance");
    }

    Object.assign(
      this,
      ratedPower,
      highVoltageLevel,
      impedance,
      irushRatio,
      irushDelay
    );
  }
}

module.exports = PowerTransformer;
