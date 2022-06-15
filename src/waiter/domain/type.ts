type Drink = "coffee" | "tea" | "orange"
export type Order<D extends Drink> = { drink: D };

type WithSugar<D extends Drink, O extends Order<D>> =
  O & { numberOfSugars: 0, stick: "without" }
  | { numberOfSugars: 1 | 2, stick: "with" };

type WithHeat<D extends Drink, O extends Order<D>> =
  O & ({ heat: "hot" | "extra_hot", drink: "coffee" | "tea" }
  | { heat: "cold", drink: "orange" });

// type WithHeat<D extends Drink, O extends Order<D>> = D extends "orange" ? { heat: "cold", drink: "orange" } : { heat: "hot" | "extra_hot", drink: "coffee" | "tea" }

const hotOrange: FullOrder<"orange"> = {
  drink: "orange",
  heat: "cold",
  numberOfSugars: 0, stick: "without"
};
console.log(hotOrange);


type FullOrder<D extends Drink> = WithSugar<D, WithHeat<D, Order<D>>>;


export type InputOrder<D extends Drink> = { drink: D };

type WithSugarAndStick<D extends Drink, O extends Order<D>> =
  O & { numberOfSugars: 0 | 1 | 2};
