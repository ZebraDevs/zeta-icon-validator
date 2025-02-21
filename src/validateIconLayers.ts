import { ComponentNode } from "./figma-types.js";
import { ErrorSeverity, ZetaIconError } from "./types.js";

export const validateIconLayers = (layers: ComponentNode): ZetaIconError => {
  const children: ComponentNode[] = (layers as any).children;
  if (children) {
    if (children.length !== 1) {
      return new ZetaIconError("Icon must have one layer called 'Icon'", ErrorSeverity.high, "LayerError");
    }
  }

  return new ZetaIconError("", ErrorSeverity.none);
};
