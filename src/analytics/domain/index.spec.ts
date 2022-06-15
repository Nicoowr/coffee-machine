import { Drink, Report, updateReport } from "./index";

describe("analytics", () => {
  test("When an coffee order is made, the report should be updated with coffee", () => {
    // GIVEN
    const drink: Drink = "coffee";

    const currentReportDrinks: Report["drinks"] = { coffee: 0, tea: 0, orange_juice: 0, chocolate: 0 }

    // WHEN
    const newReport = updateReport({drinks: currentReportDrinks, turnover: 0})(drink);

    // THEN
    expect(newReport.drinks).toEqual({ coffee: 1, tea: 0, orange_juice: 0, chocolate: 0 });
  });
  test("When an tea order is made, the report should be updated with tea", () => {
    // GIVEN
    const drink: Drink = "tea";

    const currentReportDrinks: Report["drinks"] = { coffee: 1, tea: 0, orange_juice: 0, chocolate: 0 }

    // WHEN
    const newReport = updateReport({ drinks: currentReportDrinks, turnover: 0})(drink);

    // THEN
    expect(newReport.drinks).toEqual({ coffee: 1, tea: 1, orange_juice: 0, chocolate: 0 });
  });
  test("When an drink order is made, the report should update the turnover", () => {
    // GIVEN
    const drink: Drink = "chocolate";

    const currentReport: Report = {
      drinks: { coffee: 1, tea: 0, orange_juice: 0, chocolate: 0 },
      turnover: 10
    };

    // WHEN
    const newReport = updateReport(currentReport)(drink);

    // THEN
    expect(newReport).toEqual({
      drinks: { coffee: 1, tea: 0, orange_juice: 0, chocolate: 1 },
      turnover: 10 + 0.5
    });
  });
});