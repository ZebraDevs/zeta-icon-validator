import { validateIconName } from "./validateIconName.js";
import { ErrorSeverity, ZetaIconError } from "./types.js";
import { validateProperties } from "./validateProperties.js";
import { validateIconSize } from "./validateIconSize.js";
import { ComponentNode, ComponentSetNode } from "./figma-types.js";
import { validateBoundingBox } from "./validateBoundingBox.js";
import { validateIconLayers } from "./validateIconLayers.js";

/**
 * Validates an icon
 *
 * @param icon The icon to validate
 * @param categoryName The name of the category the icon belongs to
 * @param usedIconNames The names of icons that have already been used
 * @returns A list of errors
 */
export function validateIcon(icon: ComponentSetNode, categoryName?: string, usedIconNames?: string[]): ZetaIconError[] {
  const errors: ZetaIconError[] = [];

  const iconName = icon.name;
  const nameError = validateIconName(iconName, categoryName, usedIconNames);

  if (nameError.severity != ErrorSeverity.none) {
    errors.push(nameError);
  }

  const boxSizeError = validateBoundingBox(icon);
  if (boxSizeError.severity != ErrorSeverity.none) {
    errors.push(boxSizeError);
  }

  if (icon.children.length !== 2) {
    errors.push(
      new ZetaIconError(
        "Icon layers are incorrect - should have 2 variants for style: Round and Sharp",
        ErrorSeverity.high,
        "IconPartsError"
      )
    );
  }

  errors.push(...validateProperties(icon));

  for (const child of icon.children as ComponentNode[]) {
    const styleMatch = child.name.match(/Style=(\w+)/i);
    const style = styleMatch ? styleMatch[1] : "";
    if (!child.absoluteBoundingBox) {
      errors.push(new ZetaIconError("Icon part is missing bounding box", ErrorSeverity.high, "BoundingBoxError"));
    } else {
      const sizeError = validateIconSize(child.name, child.absoluteBoundingBox);
      const layerError = validateIconLayers(child);
      const colorsFound = recFills(child);
      if (colorsFound.length > 0) {
        colorsFound.forEach((color) => {
          errors.push(new ZetaIconError(`${style} icon has a color: ` + color, ErrorSeverity.medium, "ColorError"));
        });
      }

      if (sizeError.severity != ErrorSeverity.none) {
        errors.push(sizeError);
      }
      if (layerError.severity != ErrorSeverity.none) {
        errors.push(layerError);
      }
    }
  }

  return errors;
}

/**
 * Function to recursively find all the fills in a node.
 * @param node: The node to search for fills
 * @returns An array of hex colors found in the node
 */
const recFills = (node: ComponentNode): string[] => {
  try {
    const colorsFound: string[] = [];
    const fills = (node as any).fills;
    const children = (node as any).children;
    if (fills && Array.isArray(fills) && fills.length > 0) {
      for (const fill of fills) {
        if (
          fill.color &&
          !(
            (fill.color.r === 1 && fill.color.g === 1 && fill.color.b === 1) ||
            (fill.color.r === 0 && fill.color.g === 0 && fill.color.b === 0)
          )
        ) {
          const r = Math.round(fill.color.r * 255);
          const g = Math.round(fill.color.g * 255);
          const b = Math.round(fill.color.b * 255);

          const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
          colorsFound.push(hexColor);
        }
      }
    }

    if (Array.isArray(children) && children.length > 0) {
      for (const child of children) {
        const childColors = recFills(child);
        if (childColors && Array.isArray(childColors) && childColors.length > 0) {
          colorsFound.push(...recFills(child));
        }
      }
    }
    return colorsFound;
  } catch (e) {
    console.log("Error: ", e);
  }
  return [];
};
