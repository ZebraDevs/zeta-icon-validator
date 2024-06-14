import {
  ErrorSeverity,
  ErrorType,
  checkCategoryName,
  checkIconName,
} from "../index.js";

describe("testing checkIconName", () => {
  test(`"Test Icon Name" should return an icon error with the type of ErrorType.none`, () => {
    expect(checkIconName("Test Icon Name").type).toBe(ErrorType.none);
  });

  test(`"switch" should return a ErrorType.reservedWord error`, () => {
    expect(checkIconName("switch").type).toBe(ErrorType.reservedWord);
    expect(checkIconName("switch").severity).toBe(ErrorSeverity.high);
  });

  test('"test123" should be a valid icon name', () => {
    expect(checkIconName("test123").type).toBe(ErrorType.none);
    expect(checkIconName("test123").severity).toBe(ErrorSeverity.none);
  });

  test(`"123test" should return a ErrorType.startsWithNumber error`, () => {
    expect(checkIconName("123test").type).toBe(ErrorType.startsWithNumber);
    expect(checkIconName("123test").severity).toBe(ErrorSeverity.high);
  });

  test(`"-test" should return a ${ErrorType.invalidChar} error`, () => {
    expect(checkIconName("-test").type).toBe(ErrorType.invalidChar);
    expect(checkIconName("-test").severity).toBe(ErrorType.invalidChar);
  });

  test(`"-test$" should return a ${ErrorType.invalidChar} error`, () => {
    expect(checkIconName("-test$").type).toBe(ErrorType.invalidChar);
    expect(checkIconName("-test$").severity).toBe(ErrorSeverity.high);
  });

  test(`"$test" should be a valid icon name`, () => {
    expect(checkIconName("$test").type).toBe(ErrorType.none);
    expect(checkIconName("$test").severity).toBe(ErrorSeverity.none);
  });
});

describe("testing checkCategoryName", () => {
  test("Category Name should be a valid category name", () => {
    expect(checkCategoryName("Category Name").type).toBe(ErrorType.none);
    expect(checkCategoryName("Category Name").severity).toBe(
      ErrorSeverity.none
    );
  });

  test("/Category/Name should be an invalid category name", () => {
    expect(checkCategoryName("/Category/Name").type).toBe(
      ErrorType.invalidChar
    );
    expect(checkCategoryName("/Category/Name").severity).toBe(
      ErrorSeverity.high
    );
  });
});
