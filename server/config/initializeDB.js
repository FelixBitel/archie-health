const sequelize = require('../config/db');
const Archie = require('../models/archie');
const Medication = require('../models/medication');
const Meal = require('../models/meal');
const HealthLog = require('../models/healthLog');

async function initializeDatabase() {
  try {
    // Подключение к базе данных
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно установлено.');

    // Синхронизация моделей
    await sequelize.sync({ force: false }); // Не пересоздаем таблицы, если они уже существуют
    console.log('Модели синхронизированы с базой данных.');

    // Создание профиля Арчи, если он не существует
    const [archie, created] = await Archie.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: 'Арчи',
        breed: 'Мишлинг',
        age: 11,
        weight: 21,
        status: 'Под наблюдением после операции',
        lastCheckup: '2024-12-05'
      }
    });

    if (created) {
      console.log('Профиль Арчи создан.');
    } else {
      console.log('Профиль Арчи уже существует.');
    }

    // Создание начальных лекарств, если они не существуют
    const medicationsData = [
      {
        name: 'Урзахол',
        dosage: '1 капсула',
        times: ['09:00', '21:00']
      },
      {
        name: 'Гепатосан',
        dosage: '1 таблетка',
        times: ['09:00', '18:00']
      }
    ];

    for (const medData of medicationsData) {
      const [medication, medCreated] = await Medication.findOrCreate({
        where: { name: medData.name },
        defaults: medData
      });

      if (medCreated) {
        console.log(`Лекарство "${medication.name}" создано.`);
      } else {
        console.log(`Лекарство "${medication.name}" уже существует.`);
      }
    }

    // Создание начальных приемов пищи, если они не существуют
    const mealsData = [
      {
        name: 'Утренняя порция',
        ingredients: ['Курица 150г', 'Рис 100г', 'Морковь 50г'],
        calories: 420,
        mealTime: '09:30'
      },
      {
        name: 'Вечерняя порция',
        ingredients: ['Говядина 150г', 'Гречка 100г', 'Тыква 50г'],
        calories: 450,
        mealTime: '19:00'
      }
    ];

    for (const mealData of mealsData) {
      const [meal, mealCreated] = await Meal.findOrCreate({
        where: { name: mealData.name },
        defaults: mealData
      });

      if (mealCreated) {
        console.log(`Прием пищи "${meal.name}" создан.`);
      } else {
        console.log(`Прием пищи "${meal.name}" уже существует.`);
      }
    }

    // Создание начальных записей о здоровье, если они не существуют
    const healthLogsData = [
      {
        date: '2024-12-07',
        time: '08:30',
        type: 'walk',
        notes: 'Утренняя прогулка 30 мин, активная, хорошее настроение',
        energy: 'высокая'
      },
      {
        date: '2024-12-07',
        time: '09:00',
        type: 'medication',
        notes: 'Урзахол 1 капсула - принял нормально',
        sideEffects: 'нет'
      },
      {
        date: '2024-12-07',
        time: '12:00',
        type: 'weight',
        weight: 21.2,
        notes: 'Вес в норме'
      },
      {
        date: '2024-12-06',
        time: '19:00',
        type: 'health',
        notes: 'Хромота на левую заднюю лапу уменьшилась, движения более свободные',
        severity: 'легкая'
      }
    ];

    for (const logData of healthLogsData) {
      const [log, logCreated] = await HealthLog.findOrCreate({
        where: { 
          date: logData.date,
          time: logData.time,
          type: logData.type
        },
        defaults: logData
      });

      if (logCreated) {
        console.log(`Запись о здоровье (${log.type}) создана.`);
      } else {
        console.log(`Запись о здоровье (${log.type}) уже существует.`);
      }
    }

    console.log('Инициализация базы данных завершена.');
  } catch (error) {
    console.error('Ошибка при инициализации базы данных:', error);
  }
}

module.exports = initializeDatabase;