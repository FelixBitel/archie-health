/**
 * NutritionEngine.js
 * Расчёт энергетических потребностей собаки по формуле RER → MER
 */

const NutritionEngine = {

  /**
   * Базовый энергетический обмен (Kcal/день)
   * RER = 70 × weight^0.75
   */
  calcRER(weightKg) {
    return Math.round(70 * Math.pow(weightKg, 0.75));
  },

  /**
   * Коэффициенты активности (MER = RER × k)
   */
  activityFactors: {
    low:         1.2,  // малоподвижная, пожилая, больная
    medium:      1.4,  // норма, умеренная активность
    high:        1.6,  // активные прогулки, игры
    working:     1.8,  // рабочая/служебная
  },

  /**
   * Поправки на цель
   */
  goalMultipliers: {
    maintenance: 1.0,  // поддержание веса
    loss:        0.8,  // снижение веса
    gain:        1.2,  // набор веса
    recovery:    1.1,  // восстановление после болезни
  },

  /**
   * Поправка на возраст
   */
  ageMultiplier(ageYears) {
    if (ageYears < 1)  return 3.0;  // щенок
    if (ageYears < 7)  return 1.0;  // взрослая
    if (ageYears < 10) return 0.9;  // зрелая
    return 0.8;                     // пожилая (10+)
  },

  /**
   * Итоговая дневная норма (ккал)
   */
  calcDailyCalories(profile) {
    const { weightKg, ageYears, activity, goal } = profile;
    const rer  = this.calcRER(weightKg);
    const k    = this.activityFactors[activity] || 1.4;
    const gm   = this.goalMultipliers[goal]     || 1.0;
    const am   = this.ageMultiplier(ageYears);
    return Math.round(rer * k * gm * am);
  },

  /**
   * Разделение по приёмам пищи
   */
  splitMeals(totalCals, splitRatio = { breakfast: 0.45, dinner: 0.55 }) {
    return {
      breakfast: Math.round(totalCals * splitRatio.breakfast),
      dinner:    Math.round(totalCals * splitRatio.dinner),
    };
  },

  /**
   * Расчёт нутриентов на 100 г
   */
  calcNutrition(ingredients) {
    let totalWeight = 0, protein = 0, fat = 0, carbs = 0, fiber = 0, cals = 0;
    ingredients.forEach(({ ingredient, weightG }) => {
      const w = weightG / 100;
      totalWeight += weightG;
      protein += (ingredient.protein || 0) * w;
      fat     += (ingredient.fat     || 0) * w;
      carbs   += (ingredient.carbs   || 0) * w;
      fiber   += (ingredient.fiber   || 0) * w;
      cals    += ingredient.calsPer100g * w;
    });
    const macrosCals = protein * 4 + fat * 9 + carbs * 4;
    return {
      totalWeight: Math.round(totalWeight),
      cals: Math.round(cals),
      protein: Math.round(protein),
      fat:     Math.round(fat),
      carbs:   Math.round(carbs),
      fiber:   Math.round(fiber),
      proteinPct: macrosCals > 0 ? Math.round(protein * 4 / macrosCals * 100) : 0,
      fatPct:     macrosCals > 0 ? Math.round(fat     * 9 / macrosCals * 100) : 0,
      carbsPct:   macrosCals > 0 ? Math.round(carbs   * 4 / macrosCals * 100) : 0,
    };
  },
};

if (typeof module !== 'undefined') module.exports = NutritionEngine;
