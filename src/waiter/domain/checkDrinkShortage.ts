import { BeverageQuantityChecker, Dependencies, Drink } from "./type";

export const checkDrinkShortage = (dependencies: Dependencies) => (drink: Drink): boolean => {
  const isDrinkEmpty = dependencies.beverageQuantityChecker.drinkIsEmpty(drink);
  if (isDrinkEmpty) {
    dependencies.emailNotifier.notifyMissingDrink(drink);
  }
  return isDrinkEmpty;
}