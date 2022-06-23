import { checkEnoughMoneyWasInserted } from "./checkEnoughMoneyWasInserted";
import { checkDrinkShortage } from "./checkDrinkShortage";
import { Dependencies, Drink } from "./type";
import { beverageQuantityChecker } from "../dependencies/beverageQuantityChecker";
import { emailNotifier } from "../dependencies/emailNotifier";
import { buildDependencies } from "../dependencies/dependencies";
import { error, MappingFunction, Maybe, success } from "../utils/monad";

export type NumberOfSugars = 0 | 1 | 2
export type StickNeed = "with_stick" | "without_stick";
export type HotProperty = "cold" | "hot" | "extra_hot";

export type MoneyInserted = {
  amount: number;
  currency: "EUR";
}

/*
export type MachineOrder = {drink: DrinkWithoutSugar, numberOfSugars: 0, stickNeed: "without_stick", hotProperty: "not_extra_hot"}
  | {drink: DrinkWithSugar, numberOfSugars: 0, stickNeed: "without_stick", hotProperty: HotProperty}
  | {drink: DrinkWithSugar, numberOfSugars: 1 | 2, stickNeed: "with_stick", hotProperty: HotProperty};
*/

export type Order<D extends Drink> = { drink: D };

type WithSugarAndStick<D extends Drink, O extends Order<D>> =
  O & { numberOfSugars: 0, stickNeed: "without_stick" }
  | { numberOfSugars: 1 | 2, stickNeed: "with_stick" };

type WithSugar<D extends Drink, O extends Order<D>> =
  O & { numberOfSugars: 0 | 1 | 2};

type WithHeat<D extends Drink, O extends Order<D>> =
  O & ({ heat: "hot" | "extra_hot", drink: "coffee" | "tea" }
  | { heat: "cold", drink: "orange_juice" });

export type UserOrder<D extends Drink> = WithSugar<D, WithHeat<D, Order<D>>>;

export type MachineOrder<D extends Drink> = WithSugarAndStick<D, WithHeat<D, Order<D>>>;


export type ErrorMessage =
  {messageType: "not_enough_money", message: `Missing ${number}€ to complete order`} |
  {messageType: "drink_shortage", message: `Too bad. Shortage of ${Drink}. The company has been notified.`};

const dependencies = buildDependencies();


/*export const orderDrink = (userOrder: UserOrder<Drink>, moneyInserted: MoneyInserted): MachineOrder<Drink> | ErrorMessage => {
  const isDrinkEmpty = checkDrinkShortage(dependencies)(userOrder.drink);
  if (isDrinkEmpty) {
    return {
      messageType: "drink_shortage",
      message: `Too bad. Shortage of ${userOrder.drink}. The company has been notified.`
    }
  }
  const checkMoneyResult = checkEnoughMoneyWasInserted(userOrder.drink, moneyInserted)
  if (checkMoneyResult.checkMoneyResult === "not_enough") {
    return {
      messageType: "not_enough_money",
      message: `Missing ${checkMoneyResult.missingMoney}€ to complete order`
    }
  }
  if (userOrder.numberOfSugars === 0) {
    return {
      ...userOrder,
      numberOfSugars: 0,
      stickNeed: "without_stick",
    }
  }
  return {
    ...userOrder,
    numberOfSugars: userOrder.numberOfSugars,
    stickNeed: "with_stick"
  }
}*/

const handleDrinkShortage = (dependencies: Dependencies) => (userOrder: UserOrder<Drink>): Maybe<UserOrder<Drink>> => {
  const isDrinkEmpty = checkDrinkShortage(dependencies)(userOrder.drink);
  if (isDrinkEmpty) {
    return error(`Too bad. Shortage of ${userOrder.drink}. The company has been notified.`)
  }
  return success(userOrder)
}

const handleEnoughMoneyWasInserted = (moneyInserted: MoneyInserted) => (userOrder: UserOrder<Drink>): Maybe<UserOrder<Drink>> => {
  const checkMoneyResult = checkEnoughMoneyWasInserted(userOrder.drink, moneyInserted)
  if (checkMoneyResult.checkMoneyResult === "not_enough") {
    return error(`Missing ${checkMoneyResult.missingMoney}€ to complete order`)
  }
  return success(userOrder);
}

const makeDrink = (userOrder: UserOrder<Drink>): Maybe<MachineOrder<Drink>> => {
  if (userOrder.numberOfSugars === 0) {
    return success({
      ...userOrder,
      numberOfSugars: 0,
      stickNeed: "without_stick",
    })
  }
  return success({
    ...userOrder,
    numberOfSugars: userOrder.numberOfSugars,
    stickNeed: "with_stick"
  })
}

export const orderDrink = (userOrder: UserOrder<Drink>, moneyInserted: MoneyInserted): Maybe<MachineOrder<Drink>> => {
  return success(userOrder)
    .bind(handleDrinkShortage(dependencies))
    .bind(handleEnoughMoneyWasInserted(moneyInserted))
    .bind(makeDrink)
}