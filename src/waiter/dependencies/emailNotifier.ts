import { BeverageQuantityChecker, Drink, EmailNotifier } from "../domain/type";

export const emailNotifier: EmailNotifier = {
  notifyMissingDrink(drink: Drink) {
    return;
  }
}