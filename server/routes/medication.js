const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Medication = require('../models/medication');

// @route   GET api/medication
// @desc    Get all medications
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const medications = await Medication.findAll({
      where: { isActive: true }
    });
    res.json(medications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/medication
// @desc    Add a medication
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, dosage, times } = req.body;

    const newMedication = await Medication.create({
      name,
      dosage,
      times
    });

    res.json(newMedication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/medication/:id
// @desc    Update a medication
// @access  Private
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, dosage, times, isActive } = req.body;

    const medication = await Medication.findByPk(req.params.id);
    if (!medication) {
      return res.status(404).json({ msg: 'Лекарство не найдено' });
    }

    await medication.update({
      name,
      dosage,
      times,
      isActive
    });

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/medication/:id
// @desc    Delete a medication
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const medication = await Medication.findByPk(req.params.id);
    if (!medication) {
      return res.status(404).json({ msg: 'Лекарство не найдено' });
    }

    await medication.destroy();
    res.json({ msg: 'Лекарство удалено' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;