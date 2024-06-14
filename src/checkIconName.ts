import { renameIcon } from "./renameIcon.js";
import { reservedWords } from "./reserved-words.js";
import { ErrorType, ZetaIconError } from "./types.js";

/// Check the name if a single icon
export function checkIconName(
  iconName: string,
  categoryName?: string,
  usedNames?: string[]
): ZetaIconError {
  // Starts with a number
  if (/^\d/.test(iconName)) {
    return new ZetaIconError(ErrorType.startsWithNumber, iconName);
  }

  // Contains a non alpha-numeric character except for spaces, _, and $
  if (/^(?=.*[^a-zA-Z0-9$ _]).*$/.test(iconName)) {
    return new ZetaIconError(ErrorType.invalidChar, iconName);
  }

  // Contains a reserved word
  if (reservedWords.find((reservedWord) => reservedWord === iconName)) {
    return new ZetaIconError(ErrorType.reservedWord, iconName);
  }

  // Icon name has been used
  if (
    categoryName != undefined &&
    usedNames != undefined &&
    usedNames.includes(iconName)
  ) {
    const newName = renameIcon(iconName, categoryName);
    const newNameError = checkIconName(newName);

    if (newNameError.type == ErrorType.none) {
      return new ZetaIconError(ErrorType.iconRenamed, iconName, newName);
    } else {
      return newNameError;
    }
  }

  return new ZetaIconError(ErrorType.none, iconName);
}
