// src/test/unit/ansi51.test.js

"use strict";

const ansi51 = require("../../domain/ansi51");

describe("ANSI 51 - Time Delayed Overcurrent Protection", () => {
  const testCases = [
    { demand: 500, voltageLevel: 13.8, powerFactor: 0.92 },
    { demand: 500, voltageLevel: 22.0, powerFactor: 0.92 },
    { demand: 500, voltageLevel: 34.5, powerFactor: 0.92 },
    { demand: 100, voltageLevel: 13.8, powerFactor: 0.92 },
    { demand: 100, voltageLevel: 22.0, powerFactor: 0.92 },
    { demand: 100, voltageLevel: 34.5, powerFactor: 0.92 },
    { demand: 750, voltageLevel: 13.8, powerFactor: 0.92 },
    { demand: 750, voltageLevel: 22.0, powerFactor: 0.92 },
    { demand: 750, voltageLevel: 34.5, powerFactor: 0.92 },
  ];

  testCases.forEach((testCase) => {
    it(`should correctly calculate nominal current for ${testCase.voltageLevel} kV.`, () => {
      const { demand, voltageLevel, powerFactor } = testCase;

      const expectCurrent = Number(
        parseFloat(
          demand / (Math.sqrt(3) * voltageLevel * powerFactor)
        ).toFixed(2)
      );

      const ansi51settings = new ansi51(demand, voltageLevel);
      expect(ansi51settings.getNominalCurrent()).toBe(expectCurrent, 2);
    });
  });
});
