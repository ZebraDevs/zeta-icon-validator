"use strict";
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["iconRenamed"] = 0] = "iconRenamed";
    ErrorType[ErrorType["containsInvalidChar"] = 1] = "containsInvalidChar";
    ErrorType[ErrorType["invalidDartIdentifier"] = 2] = "invalidDartIdentifier";
    ErrorType[ErrorType["invalidJSIdentifier"] = 3] = "invalidJSIdentifier";
})(ErrorType || (ErrorType = {}));
class ZetaIconNameError {
    constructor(type, iconName, newName) {
        this.type = type;
        switch (type) {
            case ErrorType.iconRenamed:
                this.message = `${iconName} will be renamed to ${newName}`;
                break;
            case ErrorType.containsInvalidChar:
                this.message = `${iconName} contains an invalid character and will not be exported to the library`;
                break;
            case ErrorType.invalidDartIdentifier:
                this.message = `${iconName} is a reserved word in Dart so will not be available for use in flutter`;
                break;
            case ErrorType.invalidJSIdentifier:
                this.message = `${iconName} is an invalid JavaScript variable name and will not be exported to the library`;
                break;
        }
    }
}
