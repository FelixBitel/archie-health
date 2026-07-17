/**
 * IngredientDB.js
 * База ингредиентов для рационов собак
 * Все значения: на 100 г продукта
 */

const IngredientDB = {

  ingredients: [
    // ──── БЕЛКИ: Мясо ────
    { id: 'chicken_breast',  name: 'Курица (грудка)',   emoji: '🍗', calsPer100g: 165, protein: 31, fat: 3.6, carbs: 0,   fiber: 0,   category: 'protein', tags: ['мясо', 'птица', 'нежирное'], safe: true, liverFriendly: true  },
    { id: 'turkey_breast',   name: 'Индейка (грудка)',  emoji: '🦃', calsPer100g: 135, protein: 29, fat: 1.0, carbs: 0,   fiber: 0,   category: 'protein', tags: ['мясо', 'птица', 'нежирное'], safe: true, liverFriendly: true  },
    { id: 'beef_lean',       name: 'Говядина постная',  emoji: '🥩', calsPer100g: 158, protein: 26, fat: 6.0, carbs: 0,   fiber: 0,   category: 'protein', tags: ['мясо', 'говядина'],          safe: true, liverFriendly: false },
    { id: 'beef_heart',      name: 'Говяжье сердце',    emoji: '🫀', calsPer100g: 112, protein: 17, fat: 4.5, carbs: 0.1, fiber: 0,   category: 'protein', tags: ['субпродукт', 'говядина'],     safe: true, liverFriendly: true  },
    { id: 'chicken_heart',   name: 'Куриное сердце',    emoji: '🫀', calsPer100g: 153, protein: 16, fat: 9.0, carbs: 0.9, fiber: 0,   category: 'protein', tags: ['субпродукт', 'птица'],        safe: true, liverFriendly: true  },
    { id: 'chicken_gizzard', name: 'Куриные желудки',   emoji: '🍖', calsPer100g:  94, protein: 18, fat: 2.1, carbs: 0,   fiber: 0,   category: 'protein', tags: ['субпродукт', 'птица'],        safe: true, liverFriendly: true  },
    { id: 'chicken_liver',   name: 'Печень куриная',    emoji: '🟤', calsPer100g: 119, protein: 17, fat: 4.5, carbs: 2.9, fiber: 0,   category: 'protein', tags: ['субпродукт', 'печень'],       safe: true, liverFriendly: false, maxPerWeek: 2 },
    { id: 'fish_white',      name: 'Рыба белая',        emoji: '🐟', calsPer100g:  90, protein: 20, fat: 1.0, carbs: 0,   fiber: 0,   category: 'protein', tags: ['рыба', 'нежирное', 'омега3'], safe: true, liverFriendly: true  },
    { id: 'salmon',          name: 'Лосось',            emoji: '🐠', calsPer100g: 208, protein: 20, fat: 13,  carbs: 0,   fiber: 0,   category: 'protein', tags: ['рыба', 'омега3'],            safe: true, liverFriendly: true  },
    { id: 'beef_tripe',      name: 'Говяжий рубец',     emoji: '🥓', calsPer100g:  96, protein: 14, fat: 4.0, carbs: 0,   fiber: 0,   category: 'protein', tags: ['субпродукт', 'пробиотик'],   safe: true, liverFriendly: true  },

    // ──── БЕЛКИ: Молочное ────
    { id: 'cottage_cheese',  name: 'Творог 5%',         emoji: '🧀', calsPer100g: 121, protein: 17, fat: 5.0, carbs: 3.3, fiber: 0,   category: 'dairy',   tags: ['молочное', 'кальций'],       safe: true, liverFriendly: true  },
    { id: 'egg',             name: 'Яйцо',              emoji: '🥚', calsPer100g: 155, protein: 13, fat: 11,  carbs: 1.1, fiber: 0,   category: 'dairy',   tags: ['яйцо', 'белок'],             safe: true, liverFriendly: true  },

    // ──── УГЛЕВОДЫ: Злаки ────
    { id: 'rice',            name: 'Рис',               emoji: '🍚', calsPer100g: 130, protein: 2.7,fat: 0.3, carbs: 28,  fiber: 0.4, category: 'grain',   tags: ['крупа', 'легкоусваиваемое'], safe: true, liverFriendly: true  },
    { id: 'buckwheat',       name: 'Гречка',            emoji: '🌾', calsPer100g: 110, protein: 3.4,fat: 0.6, carbs: 22,  fiber: 1.5, category: 'grain',   tags: ['крупа'],                     safe: true, liverFriendly: true  },
    { id: 'oatmeal',         name: 'Овсянка',           emoji: '🥣', calsPer100g:  68, protein: 2.5,fat: 1.4, carbs: 12,  fiber: 2.0, category: 'grain',   tags: ['крупа', 'клетчатка'],        safe: true, liverFriendly: true  },
    { id: 'potato',          name: 'Картофель',         emoji: '🥔', calsPer100g:  76, protein: 2.0,fat: 0.1, carbs: 17,  fiber: 1.4, category: 'grain',   tags: ['крупа', 'углеводы'],         safe: true, liverFriendly: true  },

    // ──── ОВОЩИ ────
    { id: 'carrot',          name: 'Морковь',           emoji: '🥕', calsPer100g:  35, protein: 0.9,fat: 0.2, carbs: 7,   fiber: 2.4, category: 'veggie',  tags: ['овощ', 'каротин'],           safe: true, liverFriendly: true  },
    { id: 'pumpkin',         name: 'Тыква',             emoji: '🎃', calsPer100g:  26, protein: 1.0,fat: 0.1, carbs: 5,   fiber: 0.5, category: 'veggie',  tags: ['овощ', 'пищеварение'],       safe: true, liverFriendly: true  },
    { id: 'zucchini',        name: 'Кабачок',           emoji: '🥒', calsPer100g:  24, protein: 1.2,fat: 0.3, carbs: 3.5, fiber: 1.1, category: 'veggie',  tags: ['овощ', 'лёгкое'],            safe: true, liverFriendly: true  },
    { id: 'broccoli',        name: 'Брокколи',          emoji: '🥦', calsPer100g:  34, protein: 2.8,fat: 0.4, carbs: 5,   fiber: 2.6, category: 'veggie',  tags: ['овощ', 'витамин_с'],         safe: true, liverFriendly: true, maxPerWeek: 3 },
    { id: 'greenery',        name: 'Зелень',            emoji: '🌿', calsPer100g:  25, protein: 2.5,fat: 0.5, carbs: 2,   fiber: 1.8, category: 'veggie',  tags: ['овощ', 'витамины'],          safe: true, liverFriendly: true  },
    { id: 'cucumber',        name: 'Огурец',            emoji: '🥒', calsPer100g:  15, protein: 0.7,fat: 0.1, carbs: 2.8, fiber: 0.5, category: 'veggie',  tags: ['овощ', 'вода'],              safe: true, liverFriendly: true  },
    { id: 'spinach',         name: 'Шпинат',            emoji: '🍃', calsPer100g:  23, protein: 2.9,fat: 0.4, carbs: 1.4, fiber: 2.2, category: 'veggie',  tags: ['овощ', 'железо'],            safe: true, liverFriendly: true, maxPerWeek: 2 },

    // ──── ФРУКТЫ (безопасные) ────
    { id: 'apple',           name: 'Яблоко',            emoji: '🍎', calsPer100g:  52, protein: 0.3,fat: 0.2, carbs: 12,  fiber: 2.4, category: 'fruit',   tags: ['фрукт', 'клетчатка'],        safe: true, liverFriendly: true, seedsRemove: true },
    { id: 'pear',            name: 'Груша',             emoji: '🍐', calsPer100g:  57, protein: 0.4,fat: 0.1, carbs: 13,  fiber: 3.1, category: 'fruit',   tags: ['фрукт', 'клетчатка'],        safe: true, liverFriendly: true, seedsRemove: true },
    { id: 'blueberry',       name: 'Черника',           emoji: '🫐', calsPer100g:  57, protein: 0.7,fat: 0.3, carbs: 14,  fiber: 2.4, category: 'fruit',   tags: ['фрукт', 'антиоксидант'],     safe: true, liverFriendly: true  },
    { id: 'watermelon',      name: 'Арбуз',             emoji: '🍉', calsPer100g:  30, protein: 0.6,fat: 0.2, carbs: 7,   fiber: 0.4, category: 'fruit',   tags: ['фрукт', 'вода'],             safe: true, liverFriendly: true, seedsRemove: true },

    // ──── МАСЛА И ДОБАВКИ ────
    { id: 'olive_oil',       name: 'Оливковое масло',   emoji: '🫒', calsPer100g: 884, protein: 0,  fat: 100, carbs: 0,   fiber: 0,   category: 'oil',     tags: ['масло', 'омега9'],           safe: true, liverFriendly: true, maxPerMeal: 5 },
    { id: 'salmon_oil',      name: 'Рыбий жир',         emoji: '💊', calsPer100g: 900, protein: 0,  fat: 100, carbs: 0,   fiber: 0,   category: 'supplement', tags: ['добавка', 'омега3'],         safe: true, liverFriendly: true, maxPerMeal: 3 },
  ],

  /**
   * Найти ингредиент по ID
   */
  getById(id) {
    return this.ingredients.find(i => i.id === id);
  },

  /**
   * Получить все по категории
   */
  getByCategory(category) {
    return this.ingredients.filter(i => i.category === category);
  },

  /**
   * Фильтрация с учётом профиля собаки (аллергии, лекарства, возраст)
   */
  getSafeIngredients(dogProfile) {
    const { allergies = [], medications = [], ageYears = 5 } = dogProfile;
    const isLiverMed = medications.some(m =>
      ['урзахол', 'гептрал', 'эссенциале', 'карсил', 'гепатосан'].some(lm =>
        m.toLowerCase().includes(lm)
      )
    );

    return this.ingredients.filter(ing => {
      // Аллергия
      if (allergies.some(a => ing.name.toLowerCase().includes(a.toLowerCase()))) return false;
      // Препараты печени → убираем жирное и субпродукты
      if (isLiverMed && !ing.liverFriendly) return false;
      // Слишком жирное для пожилых (10+)
      if (ageYears >= 10 && ing.fat > 15) return false;
      return true;
    });
  },

  /**
   * Предупреждения по профилю
   */
  getWarnings(dogProfile) {
    const warnings = [];
    const { medications = [], ageYears = 5, healthIssues = [] } = dogProfile;

    if (medications.some(m => m.toLowerCase().includes('урзахол') || m.toLowerCase().includes('гепатосан'))) {
      warnings.push({ icon: '💊', text: 'Арчи получает препараты печени → рацион с низким содержанием жира (< 15%), избегать субпродуктов.' });
    }
    if (healthIssues.some(h => h.toLowerCase().includes('жкт') || h.toLowerCase().includes('желудок'))) {
      warnings.push({ icon: '🫁', text: 'История проблем ЖКТ → предпочитать отварное, избегать резких смен белка.' });
    }
    if (ageYears >= 10) {
      warnings.push({ icon: '🐾', text: 'Пожилая собака (10+ лет) → меньше фосфора (ограничить красное мясо), больше Омега-3.' });
    }
    return warnings;
  },
};

if (typeof module !== 'undefined') module.exports = IngredientDB;
