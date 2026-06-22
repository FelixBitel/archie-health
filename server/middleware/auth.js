const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Middleware для проверки аутентификации
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ msg: 'Доступ запрещен. Требуется токен аутентификации.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: 'Недействительный токен.' });
    }
    req.user = user;
    next();
  });
};

// Middleware для генерации токена
const generateToken = (userData) => {
  return jwt.sign(
    { id: userData.id, username: userData.username },
    JWT_SECRET,
    { expiresIn: '7d' } // Токен действителен 7 дней
  );
};

module.exports = {
  authenticateToken,
  generateToken
};