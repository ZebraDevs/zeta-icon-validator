import { validateIconName } from "./validateIconName.js";
import { ErrorSeverity, ZetaIconError } from "./types.js";
import { validateProperties } from "./validateProperties.js";
import { validateIconSize } from "./validateIconSize.js";
import { ComponentSetNode } from "./figma-types.js";

/**
 * Validates an icon
 *
 * @param icon The icon to validate
 * @param categoryName The name of the category the icon belongs to
 * @param usedIconNames The names of icons that have already been used
 * @returns A list of errors
 */
export function validateIcon(
  icon: ComponentSetNode,
  categoryName?: string,
  usedIconNames?: string[]
): ZetaIconError[] {
  const errors: ZetaIconError[] = [];

  const iconName = icon.name;
  const nameError = validateIconName(iconName, categoryName, usedIconNames);

  if (nameError.severity != ErrorSeverity.none) {
    errors.push(nameError);
  }

  errors.push(...validateProperties(icon));

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
