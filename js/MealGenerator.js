/**
 * MealGenerator.js
 * Генератор меню с учётом профиля, нутриентов и ограничений
 * Зависит от: NutritionEngine.js, IngredientDB.js
 */

const MealGenerator = {

  /**
   * Генерация полного дневного рациона
   * @param {Object} dogProfile - профиль собаки
   * @returns {Object} - меню на день
   */
  generateDayMenu(dogProfile) {
    const totalCals   = NutritionEngine.calcDailyCalories(dogProfile);
    const split       = NutritionEngine.splitMeals(totalCals);
    const safeIngr    = IngredientDB.getSafeIngredients(dogProfile);
    const warnings    = IngredientDB.getWarnings(dogProfile);

    const breakfast = this._buildMeal(split.breakfast, safeIngr, dogProfile, 'breakfast');
    const dinner    = this._buildMeal(split.dinner,    safeIngr, dogProfile, 'dinner');

    return {
      date: new Date().toISOString().split('T')[0],
      dogProfile,
      totalCals,
      split,
      breakfast,
      dinner,
      warnings,
    };
  },

  /**
   * Построить один приём пищи
   */
  _buildMeal(targetCals, safeIngr, profile, mealType) {
    const proteins = safeIngr.filter(i => i.category === 'protein');
    const grains   = safeIngr.filter(i => i.category === 'grain');
    const veggies  = safeIngr.filter(i => i.category === 'veggie');
    const oils     = safeIngr.filter(i => i.category === 'oil');

    // Пропорции калорийности: белок 55%, злаки 30%, овощи 10%, масло 5%
    const proteinCals = Math.round(targetCals * 0.55);
    const grainCals   = Math.round(targetCals * 0.30);
    const veggieCals  = Math.round(targetCals * 0.10);
    const oilCals     = Math.round(targetCals * 0.05);

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const protein = pick(proteins);
    const grain   = pick(grains);
    const veggie1 = pick(veggies);
    const veggie2 = pick(veggies.filter(v => v.id !== veggie1?.id)) || veggie1;
    const oil     = pick(oils);

    if (!protein || !grain) return { error: 'Недостаточно ингредиентов для генерации' };

    const portionG = (cals, ingredient) =>
      Math.round((cals / ingredient.calsPer100g) * 100);

    const ingredients = [
      { ingredient: protein, weightG: portionG(proteinCals, protein) },
      { ingredient: grain,   weightG: portionG(grainCals, grain)     },
    ];
    if (veggie1) ingredients.push({ ingredient: veggie1, weightG: portionG(veggieCals * 0.6, veggie1) });
    if (veggie2 && veggie2.id !== veggie1?.id) ingredients.push({ ingredient: veggie2, weightG: portionG(veggieCals * 0.4, veggie2) });
    if (oil && oilCals > 0) ingredients.push({ ingredient: oil, weightG: Math.min(portionG(oilCals, oil), oil.maxPerMeal || 10) });

    const nutrition = NutritionEngine.calcNutrition(ingredients);

    return {
      mealType,
      targetCals,
      ingredients,
      nutrition,
      cookingMethod: this._suggestCookingMethod(profile),
    };
  },

  /**
   * Метод приготовления по профилю
   */
  _suggestCookingMethod(profile) {
    const hasGI = (profile.healthIssues || []).some(h => h.includes('жкт') || h.includes('желудок'));
    if (hasGI) return 'пар';
    if ((profile.ageYears || 0) >= 10) return 'варка';
    return 'варка';
  },
};

if (typeof module !== 'undefined') module.exports = MealGenerator;
