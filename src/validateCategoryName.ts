import { ZetaIconNameError, RenameErrorType } from "./types.js";

/// Check the name of a category
export function validateCategoryName(categoryName: string): ZetaIconNameError {
  if (!/^[^\\/:*?"<>|]+$/.test(categoryName)) {
    return new ZetaIconNameError(RenameErrorType.invalidChar, categoryName);
  }

  return new ZetaIconNameError(RenameErrorType.none, categoryName);
}
