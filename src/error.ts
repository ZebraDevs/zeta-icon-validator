export enum ErrorType {
  none,
  iconRenamed,
  invalidChar,
  reservedWord,
}

export class ZetaIconError {
  type: ErrorType;
  message: string;
  newName?: string;

  isValid: boolean = false;

  constructor(type: ErrorType, iconName: string, newName?: string) {
    this.type = type;
    this.newName = newName;

    switch (type) {
      case ErrorType.iconRenamed:
        this.message = `${iconName} will be renamed to ${newName}`;
        break;
      case ErrorType.invalidChar:
        this.message = `${iconName} contains an invalid character and will not be exported to the library`;
        break;
      case ErrorType.reservedWord:
        this.message = `${iconName} is a reserved word in Dart or Javascript so will not be available for use in flutter`;
        break;
      case ErrorType.none:
        this.message = `${iconName} is a valid icon name`;
        this.isValid = true;
        break;
    }
  }
}
