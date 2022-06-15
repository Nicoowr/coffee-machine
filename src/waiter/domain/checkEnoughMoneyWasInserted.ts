import { Drink, MoneyInserted } from "./orderDrink";
import { roundValue } from "../utils/roundValue";

type CheckMoneyResult = {
  checkMoneyResult: "enough" | "not_enough"
  missingMoney: number,
}

const DrinksPrices: { [key in Drink]: number} = {
  coffee: 0.6,
  tea: 0.4,
  chocolate: 0.5,
  orange_juice: 0.6,
}

export const checkEnoughMoneyWasInserted = (orderedDrink: Drink, moneyInserted: MoneyInserted): CheckMoneyResult => {
  const drinkPrice = DrinksPrices[orderedDrink]
  return {
    checkMoneyResult: moneyInserted.amount < drinkPrice ? "not_enough" : "enough",
    missingMoney: moneyInserted.amount < drinkPrice ? roundValue(drinkPrice - moneyInserted.amount) : 0,
  }
}