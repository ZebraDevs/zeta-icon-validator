import { ErrorSeverity, RenameErrorType, validateIconName } from "../index.js";

describe("testing validateIconName", () => {
  test(`"Test Icon Name" should return an icon error with the type of RenameErrorType.none`, () => {
    expect(validateIconName("Test Icon Name").type).toBe(RenameErrorType.none);
  });

  test(`"switch" should return a RenameErrorType.reservedWord error`, () => {
    const iconError = validateIconName("switch");

    expect(iconError.type).toBe(RenameErrorType.reservedWord);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"switch" should return a RenameErrorType.reservedWord error`, () => {
    const iconError = validateIconName("switch");

    expect(iconError.type).toBe(RenameErrorType.reservedWord);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"Switch" should return a RenameErrorType.reservedWord error`, () => {
    const iconError = validateIconName("Switch");

    expect(iconError.type).toBe(RenameErrorType.reservedWord);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test('"test123" should be a valid icon name', () => {
    const iconError = validateIconName("test123");

    expect(iconError.type).toBe(RenameErrorType.none);
    expect(iconError.severity).toBe(ErrorSeverity.none);
  });

  test(`"123test" should return a RenameErrorType.startsWithNumber error`, () => {
    const iconError = validateIconName("123test");

    expect(iconError.type).toBe(RenameErrorType.startsWithNumber);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"-test" should return a ${RenameErrorType.invalidChar} error`, () => {
    const iconError = validateIconName("-test");

    expect(iconError.type).toBe(RenameErrorType.invalidChar);
    expect(iconError.severity).toBe(RenameErrorType.invalidChar);
  });

  test(`"-test$" should return a ${RenameErrorType.invalidChar} error`, () => {
    const iconError = validateIconName("-test$");

    expect(iconError.type).toBe(RenameErrorType.invalidChar);
    expect(iconError.severity).toBe(ErrorSeverity.high);
  });

  test(`"$test" should be a valid icon name`, () => {
    const iconError = validateIconName("$test");

    expect(iconError.type).toBe(RenameErrorType.none);
    expect(iconError.severity).toBe(ErrorSeverity.none);
  });
});
