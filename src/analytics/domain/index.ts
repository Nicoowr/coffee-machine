
export type Drink = "coffee" | "tea" | "chocolate" | "orange_juice";
export type Report = { drinks: { [key in Drink]: number }; turnover: number };

const DrinksPrices: { [key in Drink]: number} = {
  coffee: 0.6,
  tea: 0.4,
  chocolate: 0.5,
  orange_juice: 0.6,
}

type MoneyInserted = { amount: number };

const updateDrinksNumber = (drinksStatistics: Report["drinks"]) => (drink: Drink): Report["drinks"] => {
  return { ...drinksStatistics, [drink]: drinksStatistics[drink] + 1 };
}

const updateTurnover = (turnover: Report["turnover"]) => (moneyInserted: MoneyInserted): Report["turnover"] => {
  return turnover + moneyInserted.amount;
}

export const updateReport = (report: Report) => (drink: Drink): Report => {
  return {
    drinks: updateDrinksNumber(report["drinks"])(drink),
    turnover: updateTurnover(report["turnover"])({ amount: DrinksPrices[drink] }),
  }
}