// src/tests/unit/PowerTransformer/imutability.test.js

/**
 * @file imutability.test.js
 * @description
 * Unit test suite for enforcing imutability rules in the PowerTransformer class
 * within the GridShield system.
 *
 * Suíte de testes unitários para garantir as regras de imutabilidade
 * da classe PowerTransformer na aplicação GridShield.
 *
 * The tests cover:
 * - Prevention of adding new properties
 * - Prevention of modifying existing properties
 * - Prevention of deleting existing properties
 * - Enforcement of object freezing
 *
 * Os testes cobrem:
 * - Impedimento de adicionar novas propriedades
 * - Impedimento de modificar propriedades existentes
 * - Impedimento de deletar propriedades existentes
 * - Verificação de congelamento do objeto
 *
 * This test suite ensures that the PowerTransformer class is immutable after
 * instantiation and throws the appropriate exception (e.g., IllegalMutationException) when mutation is attempted.
 *
 * Esta suíte de testes garante que a classe PowerTransformer é imutável após a criação
 * e lança a exceção apropriada (IllegalMutationException) quando há tentativa de mutação.
 *
 * @module tests/unit/PowerTransformer/imutability.test
 * @requires PowerTransformer
 * @requires IllegalMutationException
 */

"use strict";

const PowerTransformer = require("../../../domain/devices/PowerTransformer");
const IllegalMutationException = require("../../../errors/IllegalMutationException");

describe("PowerTransformer - imutability", () => {
  const seeds = [
    { property: "ratedPower", value: 100 },
    { property: "highVoltageLevel", value: 22.0 },
    { property: "impedance", value: 4.0 },
    { property: "irushRatio", value: 10.0 },
    { property: "irushDelay", value: 0.15 },
    { property: "nominalCurrent", value: 19.68 },
    { property: "ansiCurrent", value: 393.66 },
    { property: "ansiEarthFaultCurrent", value: 228.68 },
    { property: "rushCurrent", value: 157.46 },
    { property: "ansiDelay", value: 3 },
  ];

  const testUpdateCases = (property, newValue) => {
    it(`should not allow modification of ${property}`, () => {
      expect(() => {
        transformer[property] = newValue;
      }).toThrow(IllegalMutationException);
      expect(() => {
        Object.defineProperty(transformer, property, {
          value: newValue,
        });
      }).toThrow(IllegalMutationException);
    });
  };

  const testDeleteCases = (property) => {
    it(`should not allow deletion of ${property}`, () => {
      expect(() => {
        delete transformer[property];
      }).toThrow(IllegalMutationException);
    });
  };

  let transformer;

  beforeEach(() => {
    transformer = new PowerTransformer(150, 13.8);
  });

  it("should be frozen after creation", () => {
    expect(Object.isFrozen(transformer)).toBe(true);
  });

  describe("creation attempts", () => {
    ["foo", "bar", "mozbozozola", "customField"].forEach((prop) => {
      it(`should not allow adding new property ${prop}`, () => {
        expect(() => {
          transformer[prop] = "any value";
        }).toThrow(IllegalMutationException);
        expect(transformer[prop]).toBeUndefined();
      });
    });
  });

  describe("modifications attempts", () => {
    seeds.forEach((seeds) => {
      const { property, value } = seeds;
      testUpdateCases(property, value);
    });
  });

  describe("deletion attempts", () => {
    seeds.forEach((seeds) => {
      const { property } = seeds;
      testDeleteCases(property);
    });
  });
});
