// src/domain/devices/PowerTransformer.js

"use strict";

const MissingParametersException = require("../../errors/MissingParametersException");

class PowerTransformer {
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
