import { validateProperties } from "../src/validateProperties";
import { ErrorSeverity, ZetaIconError } from "../src/types";

describe("validateProperties", () => {
  it("should return an error if the Style property is missing", () => {
    const properties = {};
    const errors = validateProperties(properties);
    expect(errors).toEqual([
      new ZetaIconError("Style property is missing", ErrorSeverity.high),
    ]);
  });

  it("should return an error if the Style property is not a variant", () => {
    const properties = {
      Style: { type: "STRING" },
    };
    const errors = validateProperties(properties);
    expect(errors).toEqual([
      new ZetaIconError("Style property must be a variant", ErrorSeverity.high),
    ]);
  });

  it("should return an error if the Style property does not have 'Round' or 'Sharp' variants", () => {
    const properties = {
      Style: { type: "VARIANT", variantOptions: ["Flat"] },
    };
    const errors = validateProperties(properties);
    expect(errors).toEqual([
      new ZetaIconError(
        "Style property must have 'Round' and 'Sharp' variants",
        ErrorSeverity.high
      ),
    ]);
  });

  it("should not return any errors if the Style property is valid", () => {
    const properties = {
      Style: { type: "VARIANT", variantOptions: ["Round", "Sharp"] },
    };
    const errors = validateProperties(properties);
    expect(errors).toEqual([]);
  });
});
