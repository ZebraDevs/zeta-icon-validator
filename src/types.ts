export enum RenameErrorType {
  none,
  iconRenamed,
  invalidChar,
  startsWithNumber,
  reservedWord,
}

export enum ErrorSeverity {
  none,
  medium,
  high,
}

export type ZetaIconErrorType =
  | "LayerError"
  | "SizeError"
  | "NameError"
  | "BoundingBoxError"
  | "IconPartsError"
  | "ColorError";

export class ZetaIconError {
  message: string;
  severity: ErrorSeverity;
  errorType: ZetaIconErrorType | undefined;

  constructor(message: string, severity: ErrorSeverity, type?: ZetaIconErrorType) {
    this.message = message;
    this.severity = severity;
    this.errorType = type;
  }
}

export class ZetaIconNameError extends ZetaIconError {
  type: RenameErrorType;
  newName?: string;

  constructor(type: RenameErrorType, iconName: string, newName?: string) {
    let message;
    let severity;

    switch (type) {
      case RenameErrorType.iconRenamed:
        message = `Multiple icons named ${iconName} found. This will be renamed to ${newName}`;
        severity = ErrorSeverity.medium;
        break;
      case RenameErrorType.invalidChar:
        message = `${iconName} contains an invalid character and will not be available in Zeta`;
        severity = ErrorSeverity.high;
        break;
      case RenameErrorType.startsWithNumber:
        message = `${iconName} starts with a number and will not be available in Zeta`;
        severity = ErrorSeverity.high;
        break;
      case RenameErrorType.reservedWord:
        message = `${iconName} is a reserved word in Dart so the icon will not be available in Zeta. Please rename this icon.`;
        severity = ErrorSeverity.high;
        break;
      case RenameErrorType.none:
        message = `${iconName} is a valid name`;
        severity = ErrorSeverity.none;
        break;
    }

    super(message, severity, "NameError");
    this.type = type;
  }
}
