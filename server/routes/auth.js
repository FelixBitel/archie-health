const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { generateToken } = require('../middleware/auth');

// Заглушка для модели пользователя (в реальном приложении использовать базу данных)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$8K1p/a0d4U8z0i4VJkQXNeBOPz3F.Zf.9t7QF0j0G0j0G0j0G0j0G' // пароль: admin123
  }
];

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Поиск пользователя
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(400).json({ msg: 'Неверные учетные данные' });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Неверные учетные данные' });
    }

    // Генерация JWT токена
    const token = generateToken({
      id: user.id,
      username: user.username
    });

    res.json({
      msg: 'Вход выполнен успешно',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверка, существует ли пользователь
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).json({ msg: 'Пользователь уже существует' });
    }

    // Хеширование пароля
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Создание нового пользователя
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };
    users.push(newUser);

    // Генерация JWT токена
    const token = generateToken({
      id: newUser.id,
      username: newUser.username
    });

    res.status(201).json({
      msg: 'Пользователь зарегистрирован',
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;