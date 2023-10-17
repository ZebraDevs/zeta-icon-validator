import { reservedWords } from "./reserved-words";
import { ZetaIconError, ErrorType } from "./error";

export { checkIconNames, checkIconName };

function checkIconNames(
  iconName: string,
  usedNames?: string[],
  categoryName?: string
): ZetaIconError[] {
  return [];
}

function checkIconName(iconName: string): ZetaIconError {
  // Starts with a number
  if (/^\d/.test(iconName)) {
    return new ZetaIconError(ErrorType.invalidChar, iconName);
  }

  // Contains a non alpha-numeric character except for spaces, _, and $
  if (/^(?=.*[^a-zA-Z0-9$ _]).*$/.test(iconName)) {
    return new ZetaIconError(ErrorType.invalidChar, iconName);
  }

  // Contains a reserved word
  if (reservedWords.find((reservedWord) => reservedWord === iconName)) {
    return new ZetaIconError(ErrorType.reservedWord, iconName);
  }

  return new ZetaIconError(ErrorType.none, iconName);
}
