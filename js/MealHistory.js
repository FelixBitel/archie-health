/**
 * MealHistory.js
 * Журнал питания — хранение и получение истории рационов
 * Использует localStorage (IndexedDB в будущей версии)
 */

const MealHistory = {
  KEY: 'archie_meal_history',

  /**
   * Получить всю историю
   */
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch { return []; }
  },

  /**
   * Сохранить запись дня
   * @param {Object} entry { date, breakfast, dinner, reaction }
   */
  save(entry) {
    const history = this.getAll();
    const existing = history.findIndex(h => h.date === entry.date);
    if (existing >= 0) {
      history[existing] = { ...history[existing], ...entry };
    } else {
      history.push(entry);
    }
    // Хранить максимум 90 дней
    history.sort((a, b) => a.date.localeCompare(b.date));
    if (history.length > 90) history.splice(0, history.length - 90);
    localStorage.setItem(this.KEY, JSON.stringify(history));
  },

  /**
   * Записать реакцию на приём пищи
   */
  saveReaction(date, reaction) {
    const history = this.getAll();
    const entry = history.find(h => h.date === date);
    if (entry) {
      entry.reaction = reaction;
      localStorage.setItem(this.KEY, JSON.stringify(history));
    }
  },

  /**
   * Получить последние N дней
   */
  getRecent(days = 7) {
    return this.getAll().slice(-days);
  },

  /**
   * Форматировать для AI-анализа
   */
  formatForAI(days = 7) {
    return this.getRecent(days).map(entry => {
      const b = entry.breakfast;
      const d = entry.dinner;
      const bStr = b ? (b.ingredients || []).map(i => i.ingredient?.name + ' ' + i.weightG + 'г').join(', ') : 'не записан';
      const dStr = d ? (d.ingredients || []).map(i => i.ingredient?.name + ' ' + i.weightG + 'г').join(', ') : 'не записан';
      const r = entry.reaction || {};
      return `${entry.date}: завтрак [${bStr}], ужин [${dStr}], стул: ${r.stool || '—'}, энергия: ${r.energy || '—'}, оценка: ${r.rating || '—'}`;
    }).join('\n');
  },
};

if (typeof module !== 'undefined') module.exports = MealHistory;
