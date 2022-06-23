import { beverageQuantityChecker } from "./beverageQuantityChecker";
import { emailNotifier } from "./emailNotifier";
import { Dependencies } from "../domain/type";

export const buildDependencies = (): Dependencies => {
  return {
    beverageQuantityChecker,
    emailNotifier,
  }
}