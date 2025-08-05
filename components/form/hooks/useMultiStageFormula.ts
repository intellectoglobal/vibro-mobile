import { create, all } from "mathjs";

const math = create(all);

// Replace Excel-like function names with mathjs equivalents
const toMathJSCompatibleFormula = (formula: string): string => {
  return formula
    .replace(/\bSUM\b/gi, 'sum')
    .replace(/\bIF\b/gi, 'if')
    .replace(/\bROUND\b/gi, 'round')
    .replace(/\bMAX\b/gi, 'max')
    .replace(/\bMIN\b/gi, 'min')
    .replace(/\bAVERAGE\b/gi, 'mean')  // ✅ Fix AVERAGE here
    .replace(/\bAVG\b/gi, 'mean');
};

export const useFormulaCalculation = (control: any, stages: any[] = []) => {
  const allQuestions = (stages || []).flatMap(
    (stage: any) => stage?.questions || []
  );

  const evaluateFormula = (formula: string, values: any): string => {
    try {
      console.log("📐 Formula:", formula);
      console.log("📊 Values:", values);

      // ✅ Step 1: Convert Excel-style functions to mathjs format first
      let transformedFormula = toMathJSCompatibleFormula(formula);

      // ✅ Step 2: Replace all question UUIDs with values
      const parsedFormula = transformedFormula.replace(
        /[a-zA-Z0-9_-]{6,}/g,
        (match) => {
          const value = values[match];
          const num = parseFloat(value);
          if (isNaN(num)) {
            console.warn(`⚠️ Variable ${match} is missing or invalid. Defaulting to 0`);
            return "0";
          }
          return num.toString();
        }
      );

      console.log("✅ parsedFormula ::", parsedFormula);

      const result = math.evaluate(parsedFormula);

      return Number.isFinite(result) ? result.toFixed(2) : "0";
    } catch (error) {
      console.error("❌ Error evaluating formula:", error);
      return "0";
    }
  };

  return { evaluateFormula };
};
