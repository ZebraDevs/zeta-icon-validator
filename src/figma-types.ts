export interface ComponentSetNode {
  name: string;
  componentPropertyDefinitions: ComponentPropertyDefinitions;
  children: ComponentNode[];
}

export interface ComponentNode {
  name: string;
  absoluteBoundingBox: Rect;
}

export interface ComponentPropertyDefinitions {
  [propertyName: string]: {
    type: "BOOLEAN" | "TEXT" | "INSTANCE_SWAP" | "VARIANT";
    defaultValue: string | boolean;
    variantOptions?: string[];
  };
}

export interface Rect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}
