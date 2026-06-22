const axios = require('axios');

async function testAPI() {
  try {
    console.log('Тестируем API приложения здоровья Арчи...');
    
    // Тестирование регистрации пользователя
    console.log('\n1. Регистрация пользователя...');
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
      username: 'testuser',
      password: 'testpass123'
    });
    console.log('Регистрация успешна:', registerResponse.data.msg);
    const token = registerResponse.data.token;
    console.log('Получен токен:', token.substring(0, 20) + '...');
    
    // Тестирование получения профиля Арчи
    console.log('\n2. Получение профиля Арчи...');
    const profileResponse = await axios.get('http://localhost:5000/api/health/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Профиль Арчи:', profileResponse.data);
    
    // Тестирование получения лекарств
    console.log('\n3. Получение списка лекарств...');
    const medicationsResponse = await axios.get('http://localhost:5000/api/medication', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Лекарства:', medicationsResponse.data);
    
    // Тестирование получения приемов пищи
    console.log('\n4. Получение списка приемов пищи...');
    const mealsResponse = await axios.get('http://localhost:5000/api/nutrition/meals', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Приемы пищи:', mealsResponse.data);
    
    // Тестирование получения записей о здоровье
    console.log('\n5. Получение записей о здоровье...');
    const logsResponse = await axios.get('http://localhost:5000/api/health/logs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Записи о здоровье:', logsResponse.data);
    
    console.log('\n✓ Все тесты пройдены успешно!');
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.response?.data || error.message);
  }
}

testAPI();