import { ZetaIconError, ErrorType } from "./types.js";

/// Check the name of a category
export function checkCategoryName(categoryName: string): ZetaIconError {
  if (!/^[^\\/:*?"<>|]+$/.test(categoryName)) {
    return new ZetaIconError(ErrorType.invalidChar, categoryName);
  }

  return new ZetaIconError(ErrorType.none, categoryName);
}
