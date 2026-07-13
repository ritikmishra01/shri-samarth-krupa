const mysql = require('mysql2/promise');

async function testConnection() {
  const password = 'Root@123';
  console.log('Testing MySQL connection...');
  console.log('Host: localhost, Port: 3306, User: root');
  console.log('Password length:', password.length);
  
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: password,
    });
    console.log('✅ MySQL Connected Successfully!');
    const [rows] = await conn.query('SELECT VERSION() as version');
    console.log('MySQL Version:', rows[0].version);
    await conn.end();
    return true;
  } catch (err) {
    console.log('❌ Connection failed:', err.code, '-', err.message);
    return false;
  }
}

testConnection();
