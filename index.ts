import {
  ZetaIconNameError,
  RenameErrorType,
  ErrorSeverity,
  ZetaIconError,
} from "./src/types.js";
import { validateCategoryName } from "./src/validateCategoryName.js";
import { validateIcon } from "./src/validateIcon.js";
import { validateIconName } from "./src/validateIconName.js";
import { validateIconSize } from "./src/validateIconSize.js";
import { validateProperties } from "./src/validateProperties.js";

export {
  validateIcon,
  validateCategoryName,
  validateIconName,
  validateIconSize,
  validateProperties,
  ZetaIconError,
  ZetaIconNameError,
  RenameErrorType,
  ErrorSeverity,
};
