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
    const iconError = checkIconName("switch");

    expect(iconError.type).toBe(ErrorType.reservedWord);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"switch" should return a ErrorType.reservedWord error`, () => {
    const iconError = checkIconName("switch");

    expect(iconError.type).toBe(ErrorType.reservedWord);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"Switch" should return a ErrorType.reservedWord error`, () => {
    const iconError = checkIconName("Switch");

    expect(iconError.type).toBe(ErrorType.reservedWord);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test('"test123" should be a valid icon name', () => {
    const iconError = checkIconName("test123");

    expect(iconError.type).toBe(ErrorType.none);
    expect(iconError.severity).toBe(ErrorSeverity.none);
  });

  test(`"123test" should return a ErrorType.startsWithNumber error`, () => {
    const iconError = checkIconName("123test");

    expect(iconError.type).toBe(ErrorType.startsWithNumber);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"-test" should return a ${ErrorType.invalidChar} error`, () => {
    const iconError = checkIconName("-test");

    expect(iconError.type).toBe(ErrorType.invalidChar);
    expect(iconError.severity).toBe(ErrorType.invalidChar);
  });

  test(`"-test$" should return a ${ErrorType.invalidChar} error`, () => {
    const iconError = checkIconName("-test$");

    expect(iconError.type).toBe(ErrorType.invalidChar);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"$test" should be a valid icon name`, () => {
    const iconError = checkIconName("$test");

    expect(iconError.type).toBe(ErrorType.none);
    expect(iconError.severity).toBe(ErrorSeverity.none);
  });
});

describe("testing checkCategoryName", () => {
  test("Category Name should be a valid category name", () => {
    const categoryError = checkCategoryName("Category Name");

    expect(categoryError.type).toBe(ErrorType.none);
    expect(categoryError.severity).toBe(ErrorSeverity.none);
  });

  test("/Category/Name should be an invalid category name", () => {
    const categoryError = checkCategoryName("/Category/Name");

    expect(categoryError.type).toBe(ErrorType.invalidChar);
    expect(categoryError.severity).toBe(ErrorSeverity.high);
  });
});
