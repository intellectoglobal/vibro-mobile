export type LogicType = "is" | "is_not";

export type ComparisonOperator =
  | "equals"
  | "greater_than"
  | "less_than"
  | "greaterthan_or_equalto"
  | "lessthan_or_equalto";

export function matchLogicCondition(
  selectedValue: string | number,
  logicValue: string | number,
  logicType: LogicType,
  comparison?: ComparisonOperator // optional now
): boolean {
  const selected = String(selectedValue);
  const target = String(logicValue);

  // console.log("selected ::", selectedValue)
  // console.log("target ::", logicValue)
  // console.log("logicType ::", logicType)
  // console.log("comparison ::", comparison)

  // If comparison is provided, use detailed logic
  if (comparison) {
    console.log("selected ::", selectedValue)
    console.log("target ::", logicValue)
    console.log("logicType ::", logicType)
    console.log("comparison ::", comparison)
    switch (comparison) {
      case "equals":
        console.log(selectedValue != logicValue)
        return logicType == "is"
          ? selectedValue == logicValue
          : selectedValue != logicValue;

      case "greater_than":
        return logicType === "is"
          ? selected > target
          : selected <= target;

      case "less_than":
        return logicType === "is"
          ? selected < target
          : selected >= target;

      case "greaterthan_or_equalto":
        return logicType == "is"
          ? selected >= target
          : selected < target;

      case "lessthan_or_equalto":
        return logicType == "is"
          ? selected <= target
          : selected > target;

      default:
        return false;
    }
  }

  // If no comparison, fallback to simple logic type check
  return logicType == "is"
    ? selectedValue == logicValue
    : selectedValue != logicValue;
}
