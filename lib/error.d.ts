declare enum ErrorType {
    iconRenamed = 0,
    containsInvalidChar = 1,
    invalidDartIdentifier = 2,
    invalidJSIdentifier = 3
}
declare class ZetaIconNameError {
    type: ErrorType;
    message: string;
    constructor(type: ErrorType, iconName: string, newName?: string);
}
