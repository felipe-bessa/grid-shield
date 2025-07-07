// src/test/unit/PowerTransformer/requiredFields.test.js

/**
 * @file requiredFields.test.js
 * @description
 * Unit test suite for validating required fields rules in the PowerTransformer class
 * within the GridShield system.
 *
 * Suíte de testes unitários para validação das regras de campos obrigatórios
 * da classe PowerTransformer na aplicação GridShield.
 *
 * The tests cover:
 * - Missing required parameters during instantiation
 *
 * Os testes cobrem:
 * - Parâmetros obrigatórios ausentes durante a criação da instância
 *
 * This test suite ensures that the PowerTransformer class throws the appropriate
 * exception (e.g., MissingParametersException) when required data is not provided.
 *
 * Esta suíte de testes garante que a classe PowerTransformer lança a exceção
 * apropriada (MissingParametersException) quando dados obrigatórios não são fornecidos.
 *
 * @module tests/unit/PowerTransformer/requiredFields.test
 * @requires PowerTransformer
 * @requires MissingParametersException
 * @requires getProviderConfig
 */

"use strict";

const PowerTransformer = require("../../../domain/devices/PowerTransformer");
const getProviderConfig = require("../../../config/index");
const MissingParametersException = require("../../../errors/MissingParametersException");

describe("PowerTransformer - Required Fields", () => {
  it("should trigger an error for missing parameters", () => {
    expect(() => {
      new PowerTransformer();
    }).toThrow(MissingParametersException);
  });

  it("should trigger an error for missing high voltage level parameter", () => {
    const ratedPowerValues = getProviderConfig().ratedPowerOptions;
    ratedPowerValues.forEach((ratedPower) => {
      expect(() => {
        new PowerTransformer(ratedPower);
      }).toThrow(MissingParametersException);
    });
  });
});
