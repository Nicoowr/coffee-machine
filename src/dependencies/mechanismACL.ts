import { Drink, MachineOrder, NumberOfSugars, StickNeed } from "../domain/orderDrink";

type MechanismInput = `${DrinkInMechanismLanguage}:${NumberOfSugarsInMechanismLanguage}:${StickInMechanismLanguage}`

type DrinkInMechanismLanguage = "T" | "H" | "C";
type NumberOfSugarsInMechanismLanguage = "1" | "2" | "";
type StickInMechanismLanguage = "" | "0";

const drinksMapping: {[key in Drink]: DrinkInMechanismLanguage} = {
  chocolate: "H",
  coffee: "C",
  tea: "T"
}

const numberOfSugarsMapping: {[key in NumberOfSugars]: NumberOfSugarsInMechanismLanguage} = {
  0: "",
  1: "1",
  2: "2",
}

const stickMapping: Record<StickNeed, StickInMechanismLanguage> = {
  ["with_stick"]: "0",
  ["without_stick"]: "",
}

export const translateMachineOrderIntoMechanismeLanguage = (machineOrder:MachineOrder): MechanismInput => {
  return `${drinksMapping[machineOrder.drink]}:${numberOfSugarsMapping[machineOrder.numberOfSugars]}:${stickMapping[machineOrder.stickNeed]}`
}