import { Drink, MoneyInserted } from "./orderDrink";
import { checkEnoughMoneyWasInserted } from "./checkEnoughMoneyWasInserted";

describe("checkEnoughMoneyWasInserted.test", () => {
    test("If enough money is inserted for tea, should make tea", () => {
      // GIVEN
      const orderedDrink: Drink = "tea";

      const moneyInserted: MoneyInserted = {
        amount: 0.5,
        currency: "EUR"
      }
      // WHEN
      const result = checkEnoughMoneyWasInserted(orderedDrink, moneyInserted);
      // THEN
      expect(result).toEqual({
        checkMoneyResult: "enough",
        missingMoney: 0,
      })
    })
  test("If money inserted is not enough for tea, should not make tea", () => {
    // GIVEN
    const orderedDrink: Drink = "tea";
    const moneyInserted: MoneyInserted = {
      amount: 0.3,
      currency: "EUR"
    }
    // WHEN
    const result = checkEnoughMoneyWasInserted(orderedDrink, moneyInserted);
    // THEN
    expect(result).toEqual({
      checkMoneyResult: "not_enough",
      missingMoney: 0.1,
    })
  })
  test("If enough money is inserted for coffee, should make coffee", () => {
    // GIVEN
    const moneyInserted: MoneyInserted = {
      amount: 0.2,
      currency: "EUR"
    }
    const orderedDrink: Drink = "coffee";
    // WHEN
    const result = checkEnoughMoneyWasInserted(orderedDrink, moneyInserted);
    // THEN
    expect(result).toEqual({
      checkMoneyResult: "not_enough",
      missingMoney: 0.4,
    })
  })
})