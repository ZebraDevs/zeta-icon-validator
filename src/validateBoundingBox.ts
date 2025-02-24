import { ComponentNode } from "./figma-types.js";
import { ErrorSeverity, ZetaIconError } from "./types.js";

export const validateBoundingBox = (icon: ComponentNode): ZetaIconError => {
  if (!icon || !icon.absoluteBoundingBox) {
    return new ZetaIconError("Icon or bounding box is null or undefined", ErrorSeverity.none);
  }
  return icon.absoluteBoundingBox.width !== 112 || icon.absoluteBoundingBox.height !== 72
    ? new ZetaIconError(`${icon.name} icon size must be 112x72`, ErrorSeverity.medium, "BoundingBoxError")
    : new ZetaIconError("", ErrorSeverity.none);
};
