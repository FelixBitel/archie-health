const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Archie = require('../models/archie');
const HealthLog = require('../models/healthLog');

// @route   GET api/health/profile
// @desc    Get Archie's profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const archieProfile = await Archie.findOne();
    res.json(archieProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/health/profile
// @desc    Update Archie's profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { breed, age, weight, status } = req.body;
    const archieProfile = await Archie.findOne();
    
    if (!archieProfile) {
      return res.status(404).json({ msg: 'Профиль не найден' });
    }

    await archieProfile.update({
      breed: breed ?? archieProfile.breed,
      age: age ?? archieProfile.age,
      weight: weight ?? archieProfile.weight,
      status: status ?? archieProfile.status
    });

    res.json(archieProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/health/logs
// @desc    Get health logs
// @access  Private
router.get('/logs', authenticateToken, async (req, res) => {
  try {
    const logs = await HealthLog.findAll({
      order: [['date', 'DESC'], ['time', 'DESC']]
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/health/logs
// @desc    Add a health log
// @access  Private
router.post('/logs', authenticateToken, async (req, res) => {
  try {
    const { date, time, type, notes, weight, energy, severity, sideEffects } = req.body;

    const newLog = await HealthLog.create({
      date,
      time,
      type,
      notes,
      weight,
      energy,
      severity,
      sideEffects
    });

    res.json(newLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/health/logs/:id
// @desc    Update a health log
// @access  Private
router.put('/logs/:id', authenticateToken, async (req, res) => {
  try {
    const { date, time, type, notes, weight, energy, severity, sideEffects } = req.body;

    const log = await HealthLog.findByPk(req.params.id);
    if (!log) {
      return res.status(404).json({ msg: 'Запись не найдена' });
    }

    await log.update({
      date,
      time,
      type,
      notes,
      weight,
      energy,
      severity,
      sideEffects
    });

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/health/logs/:id
// @desc    Delete a health log
// @access  Private
router.delete('/logs/:id', authenticateToken, async (req, res) => {
  try {
    const log = await HealthLog.findByPk(req.params.id);
    if (!log) {
      return res.status(404).json({ msg: 'Запись не найдена' });
    }

    await log.destroy();
    res.json({ msg: 'Запись удалена' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;