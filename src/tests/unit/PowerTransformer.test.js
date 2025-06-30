// src/test/unit/PowerTransformer.test.js

/**
 * @file PowerTransformer.test.js
 * @description
 * Unit test suite for the PowerTransformer class in the GridShield system.
 * 
 * This test file validates the behavior of the PowerTransformer constructor
 * when provided with valid and invalid parameters, ensuring robustness and
 * compliance with expected input constraints.
 * 
 * Arquivo de testes unitários para a classe PowerTransformer no sistema GridShield.
 * Este arquivo valida o comportamento do construtor da classe PowerTransformer
 * quando fornecido com parâmetros válidos e inválidos, garantindo robustez e
 * conformidade com as restrições de entrada esperadas.
 * 
 * The tests cover:
 * - Missing parameters
 * - Invalid rated power values
 * - Invalid high voltage levels
 * - Invalid impedance values
 * - Invalid inrush current ratios
 * - Invalid inrush delays
 * - Nominal current calculation
 * - I ANSI current calculation
 * - In ANSI current calculation
 * 
 * Os testes cobrem:
 * - Parâmetros ausentes
 * - Valores inválidos de potência nominal
 * - Níveis de tensão inválidos
 * - Valores inválidos de impedância
 * - Relações de corrente de energização inválidas
 * - Atrasos de energização inválidos
 * - Cálculo de corrente nominal
 * - Cálculo de corrente I ANSI
 * - Cálculo de corrente In ANSI
 * 
 * This test suite ensures that the PowerTransformer class throws the appropriate
 * exceptions (e.g., MissingParametersException, IllegalArgumentException) when
 * invalid data is provided, and that it correctlu computes electrical properties
 * when valid data is used.
 *
 * Esta suíte de testes garante que a classe PowerTransformer lança as exceções
 * apropriadas (ex: MissingParametersException, IllegalArgumentException) quando
 * dados inválidos são fornecidos, e que calcula corretamente as propriedades elétricas
 * quando os dados são válidos.
 * 
 * @module tests/unit/PowerTransformer.test
 * @requires PowerTransformer
 * @requires MissingParametersException
 * @requires IllegalArgumentException
 */

"use strict"

describe("PowerTransformer", () => {

  const LINE_TO_PHASE_RATIO = Math.sqrt(3);

  const ratedPowerValues = [
    30, 45, 75, 112.5, 150, 225, 300, 500, 750, 1000, 1500, 2000, 2500, 3000 
  ];

  const highVoltageLevels = [13.8, 22.0, 34.5];

  const impedanceValues = [
    5.57, 5.6, 3.82, 1.03, 2.96, 5.47, 1.43, 3.09, 1.83, 1.52,
    3.76, 1.63, 1.36, 6.25, 4.49, 5.57, 6.15, 6.8, 1.87, 5.43,
    2.34, 5.73, 6.65, 2.54, 5.78, 5.89, 5.52, 6.34, 2.49, 5.79,
    5.5, 2.82, 6.98, 1.94, 1.03, 2.47, 5.78, 6.66, 2.37, 4.35,
    6.0, 5.93
  ];

  const irushRatioValues = [
    19.4, 8.9, 6.8, 12.7, 16.7, 5.2, 12.9, 5.4, 17.9, 17.4,
    8.9, 18.1, 13.3, 14.8, 12.4, 14.2, 7.3, 15.2, 8.5, 17.3,
    14.4, 16.2, 10.7, 7.6, 17.6, 17.7, 18.1, 18.2, 15.8, 13.6,
    13.8, 6.8, 8.3, 9.5, 13.4, 19.4, 19.8, 9.8, 13.7, 7.3,
    18.4, 9.7
  ];

  const irushDelayValues = [
    0.45, 0.43, 0.4, 0.99, 0.18, 1.0, 0.25, 0.43, 0.13, 0.58,
    0.59, 0.52, 0.41, 0.69, 0.84, 0.21, 0.27, 0.45, 0.35, 0.49,
    0.97, 0.86, 0.61, 0.44, 0.63, 0.45, 0.42, 0.33, 0.88, 0.2,
    0.9, 0.94, 0.18, 0.33, 0.33, 0.87, 0.13, 0.93, 0.66, 0.73,
    0.96, 0.62
  ];

  const wrongRatedPowers = [
    1994.5, 2358, 1044.5, 747, 2590, 2800.5, 1201.5, 2721.5, 2195, 1037.5,
    -2275.5, 2322.5, -2926, 1988.5, 528, -611, 88.5, 214.5, 2768, 268.5,
    445, 1412.5, 2352, 2911, 2184, 1653.5, 1862.5, 764, 1566, 2916.5,
    1030, 2427, 451, -1715.5, -2955, 1465.5, 693.5, 2351.5, -2477.5, 1460.5,
    1613.5, 1312.5
  ];

  const wrongHighVoltageLevels = [
    -26.0, 28.8, -13.9, 33.0, -20.1, -20.4, 27.2, 27.8, 24.9, -15.4,
    30.7, -33.1, -33.6, 29.5, 29.4, -17.3, -24.2, 32.9, 14.5, -14.2,
    20.3, -25.1, 26.1, 33.9, 29.8, 17.6, 23.7, -16.2, 25.6, 34.1,
    -28.6, 15.8, 20.2, 17.5, 18.1, -30.2, 14.0, 28.1, -18.8, -31.6,
    -23.5, 27.5
  ];

  const wrongImpedanceValues = [
    7.3, 0.61, -6.17, 0.41, 0.52, 7.4, 0.8, 0.37, 0.87, -3.33,
    -4.14, 0.74, 0.67, -3.88, -3.21, 0.3, 0.44, -2.81, 0.74, 0.55,
    11.34, 14.86, 10.76, 0.05, -2.72, -4.73, 0.44, -5.75, -1.47, -6.48,
    -1.43, 0.99, 0.08, -2.55, 0.96, -6.74, 0.72, 11.32, 7.99, 10.6,
    -3.19, 14.06
  ];

  const wrongIrushRatioValues = [
    29.0, 2.7, 4.9, -17.6, 36.4, 0.9, -1.3, 3.7, -16.7, -4.6,
    29.5, 20.9, 3.2, -2.9, -0.7, -1.1, 39.6, 22.8, 37.4, -10.3,
    2.5, 31.7, 3.4, -7.5, -3.6, -17.7, -4.9, 23.2, -14.9, 0.7,
    29.4, 32.9, -3.3, 36.2, -1.1, 2.2, 20.6, 2.5, -14.1, 2.9,
    -19.5, 3.3
  ];  

  const wrongIrushDelayValues = [
    -4.74, -3.18, 2.02, -4.59, 3.8, 4.74, 3.03, 3.69, -4.82, 2.1,
    4.14, 1.5, -1.3, 1.65, -1.98, -2.04, -3.84, -2.23, -4.24, -2.31,
    2.23, 3.63, 4.53, -0.31, -3.68, -2.37, 1.58, -2.71, 2.04, 4.61,
    3.46, -3.71, -2.5, 3.19, 1.08, -0.76, 1.31, -4.23, 1.68, 3.34,
    1.61, -1.76
  ];

  const testCases = ratedPowerValues.flatMap(ratedPower =>
    highVoltageLevels.map(highVoltageLevel => ({
      ratedPower, highVoltageLevel
    }))
  );

  const createPowerTransformer = (...args) => () => new PowerTransformer(...args);
  
  describe("Missing parameters", () => {
    it("should trigger an error for missing parameters", () => {
      expect(createPowerTransformer()).toThrow(MissingParametersException);
      expect(createPowerTransformer(1000)).toThrow(MissingParametersException);
    });
  });

  describe("Invalid rated power", () => {
    testCases.forEach(({ highVoltageLevel }, index) => {
      const wrongRatedPower = wrongRatedPowers[index];
      const impedance = impedanceValues[index];
      const irushRatio = irushRatioValues[index];
      const irushDelay = irushDelayValues[index];

      it(`should trigger an error for ${wrongRatedPower} KVA.`, () => {
        expect(createPowerTransformer(wrongRatedPower, highVoltageLevel)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(wrongRatedPower, highVoltageLevel, impedance)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(wrongRatedPower, highVoltageLevel, impedance, irushRatio)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(wrongRatedPower, highVoltageLevel, impedance, irushRatio, irushDelay)).toThrow(IllegalArgumentException);
      });
    });
  });

  describe("Invalid voltage level", () => {
    testCases.forEach(({ ratedPower }, index) => {
      const wrongHighVoltageLevel = wrongHighVoltageLevels[index];
      const impedance = impedanceValues[index];
      const irushRatio = irushRatioValues[index];
      const irushDelay = irushDelayValues[index];
      
      it(`should trigger an error for ${wrongHighVoltageLevel} kV.`, () => {
        expect(createPowerTransformer(ratedPower, wrongHighVoltageLevel)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(ratedPower, wrongHighVoltageLevel, impedance)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(ratedPower, wrongHighVoltageLevel, impedance, irushRatio)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(ratedPower, wrongHighVoltageLevel, impedance, irushRatio, irushDelay)).toThrow(IllegalArgumentException);
      });
    });
  });

  describe("Invalid impedance", () => {
    testCases.forEach(({ ratedPower, highVoltageLevel }, index) => {
      const wrongImpedance = wrongImpedanceValues[index];
      const irushRatio = irushRatioValues[index];
      const irushDelay = irushDelayValues[index];

      it(`should trigger an error for ${wrongImpedance} Z%.`, () => {
        expect(createPowerTransformer(ratedPower, highVoltageLevel, wrongImpedance)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(ratedPower, highVoltageLevel, wrongImpedance, irushRatio)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(ratedPower, highVoltageLevel, wrongImpedance, irushRatio, irushDelay)).toThrow(IllegalArgumentException);
      });
    });
  });

  describe("Invalid irush ratio", () => {
    testCases.forEach(({ ratedPower, highVoltageLevel }, index) => {
      const impedance = impedanceValues[index];
      const wrongIrushRatio = wrongIrushRatioValues[index];
      const irushDelay = irushDelayValues[index];
      
      it(`should trigger an error for ${wrongIrushRatio} x In.`, () => {
        expect(createPowerTransformer(ratedPower, highVoltageLevel, impedance, wrongIrushRatio)).toThrow(IllegalArgumentException);
        expect(createPowerTransformer(ratedPower, highVoltageLevel, impedance, wrongIrushRatio, irushDelay)).toThrow(IllegalArgumentException); 
      });
    });
  });

  describe("Invalid irush delay", () => {
    testCases.forEach(({ ratedPower, highVoltageLevel }, index) => {
      const impedance = impedanceValues[index];
      const irushRatio = irushRatioValues[index];
      const wrongIrushDelay = wrongIrushDelayValues[index];
      
      it(`should trigger an error for ${wrongIrushDelay} seconds.`, () => {
        expect(createPowerTransformer(ratedPower, highVoltageLevel, impedance, irushRatio, wrongIrushDelay)).toThrow(IllegalArgumentException); 
      });
    });
  });

  describe("PowerTransformer nominal current (In)", () => {
    testCases.forEach(({ ratedPower, highVoltageLevel }, index) => {
      const impedance = impedanceValues[index];
      const irushRatio = irushRatioValues[index];
      const irushDelay = irushDelayValues[index];
      
      it(`should correctly calculate nominal current for ${ratedPower} KVA transformer at ${highVoltageLevel} kV (Z% = ${impedance}, IM/IN = ${irushRatio}, Irush delay = ${irushDelay} s).`, () => {
        const transformer = new PowerTransformer(ratedPower, highVoltageLevel, impedance, irushRatio, irushDelay);
        const expectedCurrent = Number(parseFloat(ratedPower / (highVoltageLevel * LINE_TO_PHASE_RATIO)).toFixed(2));
        expect(transformer.nominalCurrent).toBe(expectedCurrent); 
      });
    });
  });

  describe("PowerTransformer - I ANSI Calculation", () => {
    testCases.forEach(({ ratedPower, highVoltageLevel }, index) => {
      const impedance = impedanceValues[index];
      const irushRatio = irushRatioValues[index];
      const irushDelay = irushDelayValues[index];
      
      it(`should return correct I ANSI current for ${ratedPower} KVA transformer at ${highVoltageLevel} kV (Z% = ${impedance}, IM/IN = ${irushRatio}, Irush delay = ${irushDelay} s).`, () => {
        const transformer = new PowerTransformer(ratedPower, highVoltageLevel, impedance, irushRatio, irushDelay);
        const expectedCurrent = Number(parseFloat(ratedPower / (highVoltageLevel * LINE_TO_PHASE_RATIO)).toFixed(2));
        const expectedIAnsi = Number(parseFloat(expectedCurrent * (100/impedance)).toFixed(2));
        expect(transformer.iAnsi).toBe(expectedIAnsi); 
      });
    });
  });

  describe("PowerTransformer - In ANSI Calculation", () => {
    testCases.forEach(({ ratedPower, highVoltageLevel }, index) => {
      const impedance = impedanceValues[index];
      const irushRatio = irushRatioValues[index];
      const irushDelay = irushDelayValues[index];
      
      it(`should return correct In ANSI current for ${ratedPower} KVA transformer at ${highVoltageLevel} kV (Z% = ${impedance}, IM/IN = ${irushRatio}, Irush delay = ${irushDelay} s).`, () => {
        const transformer = new PowerTransformer(ratedPower, highVoltageLevel, impedance, irushRatio, irushDelay);
        const expectedCurrent = Number(parseFloat(ratedPower / (highVoltageLevel * LINE_TO_PHASE_RATIO)).toFixed(2));
        const expectedIAnsi = Number(parseFloat(expectedCurrent * (100/impedance)).toFixed(2));
        const expectedInAnsi = Number(parseFloat(expectedIAnsi * 0.58).toFixed(2));
        expect(transformer.inAnsi).toBe(expectedInAnsi); 
      });
    });
  });

});