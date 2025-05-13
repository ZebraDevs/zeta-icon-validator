import { validateProperties } from "../src/validateProperties";
import { ComponentSetNode } from "../src/figma-types";
import { ZetaIconError, ErrorSeverity } from "../src/types";

describe("validateProperties", () => {
  it("should return an error if properties are invalid", () => {
    const icon: ComponentSetNode = {
      name: "InvalidIcon",
      componentPropertyDefinitions: null as any,
      children: [],
    };

    const errors = validateProperties(icon);

    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe("InvalidIcon has invalid properties");
    expect(errors[0].severity).toBe(ErrorSeverity.high);
  });

  it("should return an error if Style property is missing", () => {
    const icon: ComponentSetNode = {
      name: "IconWithoutStyle",
      componentPropertyDefinitions: {},
      children: [],
    };

    const errors = validateProperties(icon);

    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe("Style property is missing");
    expect(errors[0].severity).toBe(ErrorSeverity.high);
  });

  it("should return an error if Style property is not a variant", () => {
    const icon: ComponentSetNode = {
      name: "IconWithInvalidStyle",
      componentPropertyDefinitions: {
        Style: {
          type: "TEXT",
          defaultValue: "",
        },
      },
      children: [],
    };

    const errors = validateProperties(icon);

    expect(errors).toHaveLength(2);
    expect(errors[0].message).toBe("Style property must be a variant");
    expect(errors[0].severity).toBe(ErrorSeverity.high);
  });

  it("should return an error if Style property does not have 'Round' or 'Sharp' variants", () => {
    const icon: ComponentSetNode = {
      name: "IconWithInvalidVariants",
      componentPropertyDefinitions: {
        Style: {
          type: "VARIANT",
          variantOptions: ["Square"],
        },
      },
      children: [],
    };

    const errors = validateProperties(icon);

    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe("Style property must have 'Round' and 'Sharp' variants");
    expect(errors[0].severity).toBe(ErrorSeverity.high);
  });

  it("should not return any errors for valid properties", () => {
    const icon: ComponentSetNode = {
      name: "ValidIcon",
      componentPropertyDefinitions: {
        Style: {
          type: "VARIANT",
          variantOptions: ["Round", "Sharp"],
        },
      },
      children: [],
    };

    const errors = validateProperties(icon);

    expect(errors).toHaveLength(0);
  });
});
