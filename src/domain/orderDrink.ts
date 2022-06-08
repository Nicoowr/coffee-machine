import { checkEnoughMoneyWasInserted } from "./checkEnoughMoneyWasInserted";

export type DrinkWithSugar = "coffee" | "tea" | "chocolate";
export type DrinkWithoutSugar = "orange_juice";
export type Drink = DrinkWithoutSugar | DrinkWithSugar;
export type NumberOfSugars = 0 | 1 | 2
export type StickNeed = "with_stick" | "without_stick";
export type HotProperty = "cold" | "hot" | "extra_hot";

export type UserOrder = {
  drink: DrinkWithSugar;
  numberOfSugars: NumberOfSugars;
  hotProperty: HotProperty;
} | {drink: DrinkWithoutSugar};

export type MoneyInserted = {
  amount: number;
  currency: "EUR";
}

export type MachineOrder = {drink: DrinkWithoutSugar, numberOfSugars: 0, stickNeed: "without_stick", hotProperty: "not_extra_hot"}
  | {drink: DrinkWithSugar, numberOfSugars: 0, stickNeed: "without_stick", hotProperty: HotProperty}
  | {drink: DrinkWithSugar, numberOfSugars: 1 | 2, stickNeed: "with_stick", hotProperty: HotProperty};
export type ErrorMessage = {messageType: "not_enough_money", message: `Missing ${number}€ to complete order`}

export const userOrderCanHaveSugar = (userOrder: UserOrder): userOrder is {
  drink: DrinkWithSugar;
  numberOfSugars: NumberOfSugars;
  hotProperty: HotProperty;
} => userOrder.drink !== "orange_juice"

export const drinkCanBeExtraHot = (drink: Drink): drink is DrinkWithSugar => drink !== "orange_juice"

export const orderDrink = (userOrder: UserOrder, moneyInserted: MoneyInserted): MachineOrder | ErrorMessage => {
  const checkMoneyResult = checkEnoughMoneyWasInserted(userOrder.drink, moneyInserted)
  if (checkMoneyResult.checkMoneyResult === "not_enough") {
    return {
      messageType: "not_enough_money",
      message: `Missing ${checkMoneyResult.missingMoney}€ to complete order`
    }
  }
  if (userOrderCanHaveSugar(userOrder) && userOrder.numberOfSugars !== 0) {
    return {drink: userOrder.drink, numberOfSugars: userOrder.numberOfSugars, stickNeed: "with_stick", hotProperty: userOrder.hotProperty}
  }
  if (drinkCanBeExtraHot(userOrder.drink)) {
    return {drink: userOrder.drink, numberOfSugars: 0, stickNeed: "without_stick", hotProperty: "extra_hot"}
  }
  return {drink: userOrder.drink, numberOfSugars: 0, stickNeed: "without_stick", hotProperty: "not_extra_hot"}
}