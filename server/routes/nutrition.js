const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Meal = require('../models/meal');

// @route   GET api/nutrition/meals
// @desc    Get all meals
// @access  Private
router.get('/meals', authenticateToken, async (req, res) => {
  try {
    const meals = await Meal.findAll({
      order: [['mealTime', 'ASC']]
    });
    res.json(meals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/nutrition/meals
// @desc    Add a meal
// @access  Private
router.post('/meals', authenticateToken, async (req, res) => {
  try {
    const { name, ingredients, calories, mealTime } = req.body;

    const newMeal = await Meal.create({
      name,
      ingredients,
      calories,
      mealTime
    });

    res.json(newMeal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/nutrition/meals/:id
// @desc    Update a meal
// @access  Private
router.put('/meals/:id', authenticateToken, async (req, res) => {
  try {
    const { name, ingredients, calories, mealTime } = req.body;

    const meal = await Meal.findByPk(req.params.id);
    if (!meal) {
      return res.status(404).json({ msg: 'Прием пищи не найден' });
    }

    await meal.update({
      name,
      ingredients,
      calories,
      mealTime
    });

    res.json(meal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/nutrition/meals/:id
// @desc    Delete a meal
// @access  Private
router.delete('/meals/:id', authenticateToken, async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id);
    if (!meal) {
      return res.status(404).json({ msg: 'Прием пищи не найден' });
    }

    await meal.destroy();
    res.json({ msg: 'Прием пищи удален' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;