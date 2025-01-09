import { RenameErrorType, ErrorSeverity } from "../src/types";
import { validateCategoryName } from "../src/validateCategoryName";

describe("testing validateCategoryName", () => {
  test("Category Name should be a valid category name", () => {
    const categoryError = validateCategoryName("Category Name");

    expect(categoryError.type).toBe(RenameErrorType.none);
    expect(categoryError.severity).toBe(ErrorSeverity.none);
  });

  test("/Category/Name should be an invalid category name", () => {
    const categoryError = validateCategoryName("/Category/Name");

    expect(categoryError.type).toBe(RenameErrorType.invalidChar);
    expect(categoryError.severity).toBe(ErrorSeverity.high);
  });
});
