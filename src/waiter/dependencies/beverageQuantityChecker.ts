import { BeverageQuantityChecker, Drink } from "../domain/type";

export const beverageQuantityChecker: BeverageQuantityChecker = {
  drinkIsEmpty(drink: Drink): boolean {
    return false;
  }
}