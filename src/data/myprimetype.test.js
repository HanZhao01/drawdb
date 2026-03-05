import { describe, it, expect } from "vitest";
import { dbToTypes } from "./datatypes";
import { DB } from "./constants";

describe("MYPRIMETYPE datatype", () => {
  const myPrimeType = dbToTypes[DB.GENERIC].MYPRIMETYPE;

  it("is defined on GENERIC database", () => {
    expect(myPrimeType).toBeTruthy();
    expect(myPrimeType.type).toBe("MYPRIMETYPE");
    expect(myPrimeType.isSized).toBe(false);
    expect(myPrimeType.hasPrecision).toBe(false);
    expect(myPrimeType.canIncrement).toBe(false);
  });

  it("accepts empty default (no default value)", () => {
    const field = { default: "" };
    expect(myPrimeType.checkDefault(field)).toBe(true);
  });

  it("accepts supported odd positive integers (1, 3, 5, 7, 9, 11, ...)", () => {
    const validValues = ["1", "3", "5", "7", "9", "11", "101"];
    for (const value of validValues) {
      const field = { default: value };
      expect(myPrimeType.checkDefault(field)).toBe(true);
    }
  });

  it("rejects non-numeric, even, zero or negative values", () => {
    const invalidValues = ["0", "2", "4", "-1", "-3", "1.5", "abc", "2.0"];
    for (const value of invalidValues) {
      const field = { default: value };
      expect(myPrimeType.checkDefault(field)).toBe(false);
    }
  });
});

