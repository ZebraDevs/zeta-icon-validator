import { renameIcon } from "./renameIcon.js";
import { reservedWords } from "./reserved-words.js";
import { RenameErrorType, ZetaIconNameError } from "./types.js";

/// Check the name if a single icon
export function validateIconName(iconName: string, categoryName?: string, usedNames?: string[]): ZetaIconNameError {
  // Starts with a number
  if (/^\d/.test(iconName)) {
    return new ZetaIconNameError(RenameErrorType.startsWithNumber, iconName);
  }

  // Contains a non alpha-numeric character except for spaces, _, and $
  if (/^(?=.*[^a-zA-Z0-9$ _]).*$/.test(iconName)) {
    return new ZetaIconNameError(RenameErrorType.invalidChar, iconName);
  }

  // Contains a reserved word
  if (reservedWords.find((reservedWord) => reservedWord === iconName.toLowerCase())) {
    return new ZetaIconNameError(RenameErrorType.reservedWord, iconName);
  }

  // Icon name has been used
  if (categoryName != undefined && usedNames != undefined && usedNames.includes(iconName)) {
    const newName = renameIcon(iconName, categoryName);
    const newNameError = validateIconName(newName);

    if (newNameError.type == RenameErrorType.none) {
      return new ZetaIconNameError(RenameErrorType.iconRenamed, iconName, newName);
    } else {
      return newNameError;
    }
  }

  return new ZetaIconNameError(RenameErrorType.none, iconName);
}
