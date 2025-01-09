import { ComponentPropertyDefinitions } from "./figma-types.js";
import { ErrorSeverity, ZetaIconError } from "./types.js";

export function validateProperties(
  properties: ComponentPropertyDefinitions
): ZetaIconError[] {
  const errors: ZetaIconError[] = [];

  const styleProperty = properties["Style"];

  if (styleProperty == undefined) {
    errors.push(
      new ZetaIconError("Style property is missing", ErrorSeverity.high)
    );

    return errors;
  }

  if (styleProperty.type != "VARIANT") {
    errors.push(
      new ZetaIconError("Style property must be a variant", ErrorSeverity.high)
    );
  }

  if (
    !styleProperty.variantOptions?.includes("Round") &&
    !styleProperty.variantOptions?.includes("Sharp")
  ) {
    errors.push(
      new ZetaIconError(
        "Style property must have 'Round' and 'Sharp' variants",
        ErrorSeverity.high
      )
    );
  }

  return errors;
}
