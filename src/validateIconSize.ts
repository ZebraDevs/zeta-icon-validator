import { Rect } from "./figma-types.js";
import { ErrorSeverity, ZetaIconError } from "./types.js";

export function validateIconSize(
  variant: String,
  iconSize: Rect
): ZetaIconError {
  if (iconSize.width !== 24 || iconSize.height !== 24) {
    return new ZetaIconError(
      `${variant} icon size must be 24x24`,
      ErrorSeverity.high
    );
  }

  return new ZetaIconError("", ErrorSeverity.none);
}
