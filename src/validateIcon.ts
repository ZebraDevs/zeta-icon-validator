import { validateIconName } from "./validateIconName.js";
import { ErrorSeverity, ZetaIconError } from "./types.js";
import { validateProperties } from "./validateProperties.js";
import { validateIconSize } from "./validateIconSize.js";
import { ComponentSetNode } from "./figma-types.js";

export function validateIcon(icon: ComponentSetNode): ZetaIconError[] {
  const errors: ZetaIconError[] = [];

  const iconName = icon.name;
  const nameError = validateIconName(iconName);

  if (nameError.severity != ErrorSeverity.none) {
    errors.push(nameError);
  }

  const properties = icon.componentPropertyDefinitions;

  errors.push(...validateProperties(properties));

  for (const child of icon.children) {
    if (!child.absoluteBoundingBox) {
      errors.push(
        new ZetaIconError(
          "Icon part is missing bounding box",
          ErrorSeverity.high
        )
      );
    } else {
      const sizeError = validateIconSize(child.name, child.absoluteBoundingBox);

      if (sizeError.severity != ErrorSeverity.none) {
        errors.push(sizeError);
      }
    }
  }

  return errors;
}
