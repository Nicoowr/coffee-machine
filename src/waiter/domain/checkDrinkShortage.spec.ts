import { checkDrinkShortage } from "./checkDrinkShortage";
import { BeverageQuantityChecker, Dependencies, Drink } from "./type";

describe("checkDrinkShortage.spec", () => {
  test("If there is shortage of ordered drink, should return true", () => {
    // GIVEN
    const orderedDrink: Drink = "tea";
    const beverageQuantityChecker: BeverageQuantityChecker = {
      drinkIsEmpty: (drink) => true
    };
    // WHEN
    const result = checkDrinkShortage({
      beverageQuantityChecker,
      emailNotifier: { notifyMissingDrink: jest.fn() }
    })(orderedDrink);

    // THEN
    expect(result).toEqual(true);
  });
  test("If there is no shortage of ordered drink, should return false", () => {
    // GIVEN
    const orderedDrink: Drink = "tea";
    const beverageQuantityChecker: BeverageQuantityChecker = {
      drinkIsEmpty: (drink) => false
    };
    // WHEN
    const result = checkDrinkShortage({
      beverageQuantityChecker, emailNotifier: { notifyMissingDrink: jest.fn() }
    })(orderedDrink);

    // THEN
    expect(result).toEqual(false);
  });
  test("If there is shortage for an ordered drink, should notify the company of it", () => {
    // GIVEN
    const orderedDrink: Drink = "tea";
    const dependencies: Dependencies = {
      beverageQuantityChecker: {
        drinkIsEmpty: (drink) => true
      },
      emailNotifier: {
        notifyMissingDrink: jest.fn()
      }
    };

    // WHEN
    checkDrinkShortage(dependencies)(orderedDrink);

    // THEN
    expect(dependencies.emailNotifier.notifyMissingDrink).toHaveBeenCalledWith(orderedDrink);
  });
});