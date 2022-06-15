import { MachineOrder } from "../domain/orderDrink";
import { translateMachineOrderIntoMechanismeLanguage } from "./mechanismACL";

describe("mechanismACL", () => {
    test("Should translate 1 tea + 1 sugar + 1 stick into T:1:0", () => {
      // GIVEN
        const machineOrder: MachineOrder = {
            drink: "tea",
            numberOfSugars: 1,
            stickNeed: "with_stick"
        }
      // WHEN
        const result = translateMachineOrderIntoMechanismeLanguage(machineOrder);
      // THEN
        expect(result).toEqual("T:1:0")
    })
    test("Should translate 1 chocolate + 1 sugar + 1 stick into C:1:0", () => {
        // GIVEN
        const machineOrder: MachineOrder = {
            drink: "chocolate",
            numberOfSugars: 1,
            stickNeed: "with_stick"
        }
        // WHEN
        const result = translateMachineOrderIntoMechanismeLanguage(machineOrder);
        // THEN
        expect(result).toEqual("H:1:0")
    })
    test("Should translate 1 chocolate + 0 sugar + 0 stick into H::", () => {
        // GIVEN
        const machineOrder: MachineOrder = {
            drink: "chocolate",
            numberOfSugars: 0,
            stickNeed: "without_stick"
        }
        // WHEN
        const result = translateMachineOrderIntoMechanismeLanguage(machineOrder);
        // THEN
        expect(result).toEqual("H::")
    })
})