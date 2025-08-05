export const useFormulaCalculation = (control: any, stages: any[] = []) => {
  const allQuestions = (stages || []).flatMap(
    (stage: any) => stage?.questions || []
  );

  const evaluateFormula = (formula: string, values: any): string => {
    try {
      // Replace variable references with their actual values
      const replacedFormula = formula.replace(/#(\w+)/g, (match, varName) => {
        const question = allQuestions.find((q: any) => q?.question === varName);
        if (question && values[question.question_uuid]) {
          return values[question.question_uuid].toString();
        }
        return "0";
      });

      // Simple evaluation (in production, use a proper formula parser)
      if (replacedFormula.includes("SUM")) {
        const sumParts = replacedFormula.match(/SUM\(([^)]+)\)/);
        if (sumParts) {
          const numbers = sumParts[1].split(",").map(Number);
          const sum = numbers.reduce((a, b) => a + b, 0);
          const multiplierMatch = replacedFormula.match(/\*(\d+)/);
          const multiplier = multiplierMatch ? Number(multiplierMatch[1]) : 1;
          return (sum * multiplier).toString();
        }
      }

      return eval(replacedFormula).toString();
    } catch (error) {
      console.error("Error evaluating formula:", error);
      return "";
    }
  };

  return { evaluateFormula };
};
