import { ErrorMessage, MachineOrder, MoneyInserted, orderDrink, UserOrder } from "./orderDrink";

describe("orderDrink", () => {
    test("Should make a coffee without sugar nor stick when a coffee without sugar is ordered", () => {
        // GIVEN
        const userOrder: UserOrder = {
            drink: "coffee",
            numberOfSugars: 0,
        }
        const moneyInserted: MoneyInserted = {
            amount: 1,
            currency: "EUR"
        }
        // WHEN
        const result: MachineOrder | ErrorMessage = orderDrink(userOrder, moneyInserted);
        // THEN

        expect(result).toEqual({drink: "coffee", numberOfSugars: 0, stickNeed: "without_stick"})
    })
    test("Should make a coffee with 1 sugar and stick when a coffee with 1 sugar is ordered", () => {
        // GIVEN
        const userOrder: UserOrder = {
            drink: "coffee",
            numberOfSugars: 1,
        }
        const moneyInserted: MoneyInserted = {
            amount: 1,
            currency: "EUR"
        }
        // WHEN
        const result: MachineOrder | ErrorMessage = orderDrink(userOrder, moneyInserted);
        // THEN

        expect(result).toEqual({drink: "coffee", numberOfSugars: 1, stickNeed: "with_stick"})
    })
    test("Should make a tea with 1 sugar and stick when a tea with 1 sugar is ordered", () => {
        // GIVEN
        const userOrder: UserOrder = {
            drink: "tea",
            numberOfSugars: 1,
        }
        const moneyInserted: MoneyInserted = {
            amount: 1,
            currency: "EUR"
        }
        // WHEN
        const result: MachineOrder | ErrorMessage = orderDrink(userOrder, moneyInserted);
        // THEN

        expect(result).toEqual({drink: "tea", numberOfSugars: 1, stickNeed: "with_stick"})
    })
    test("Should make an orange juice when it is ordered", () => {
        // GIVEN
        const userOrder: UserOrder = {
            drink: "orange_juice",
        }
        const moneyInserted: MoneyInserted = {
            amount: 1,
            currency: "EUR"
        }
        // WHEN
        const result: MachineOrder | ErrorMessage = orderDrink(userOrder, moneyInserted);
        // THEN

        expect(result).toEqual({drink: "orange_juice", numberOfSugars: 0, stickNeed: "without_stick"})
    })
    test("If not enough money was inserted, should return an error message", () => {
        // GIVEN
        const userOrder: UserOrder = {
            drink: "tea",
            numberOfSugars: 1,
        }
        const moneyInserted: MoneyInserted = {
            amount: 0.1,
            currency: "EUR"
        }
        // WHEN
        const result: MachineOrder | ErrorMessage = orderDrink(userOrder, moneyInserted);
        // THEN

        expect(result).toEqual({messageType: "not_enough_money", message: `Missing 0.3€ to complete order`})
    })
})