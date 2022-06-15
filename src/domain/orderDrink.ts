import { checkEnoughMoneyWasInserted } from "./checkEnoughMoneyWasInserted";

export type Drink = "coffee" | "tea" | "chocolate" | "orange_juice"
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


export type ErrorMessage = {messageType: "not_enough_money", message: `Missing ${number}€ to complete order`}


export const orderDrink = (userOrder: UserOrder<Drink>, moneyInserted: MoneyInserted): MachineOrder<Drink> | ErrorMessage => {
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
}