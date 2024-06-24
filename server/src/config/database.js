const mysql = require('mysql2/promise');

require('dotenv').config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl:{
    rejectUnauthorized: false,
    
  }

});


const connect = async () => {
  try {
    await pool.getConnection();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};




const insertWaterLevel = async (level) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO water_levels (timestamp, level) VALUES (NOW(), ?)',
      [level]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error al insertar nivel de agua:', error);
    throw error;
  }
};

// Función para obtener el ultimo nivel de agua registrado.
const getLastWaterLevels = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT timestamp, level FROM water_levels ORDER BY timestamp DESC LIMIT 1'
    );
    return rows;
  } catch (error) {
    console.error('Error al obtener niveles de agua:', error);
    throw error;
  }
};

// Función para insertar un nuevo dato de caudal
const insertFlowRate = async (rate) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO flow_rates (timestamp, rate) VALUES (NOW(), ?)',
      [rate]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error al insertar dato de caudal:', error);
    throw error;
  }
};

// Función para obtener la potencia generada en las últimas 24 horas
const getPowerGenerationLast24Hours = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT timestamp, power FROM power_generation WHERE timestamp >= NOW() - INTERVAL 1 DAY ORDER BY timestamp'
    );
    return rows;
  } catch (error) {
    console.error('Error al obtener datos de potencia generada:', error);
    throw error;
  }
};

// Función para insertar una nueva alerta
const insertAlert = async (type, message) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO alerts (timestamp, type, message) VALUES (NOW(), ?, ?)',
      [type, message]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error al insertar alerta:', error);
    throw error;
  }
};

// Exportar las funciones
module.exports = {
  insertWaterLevel,
  getLastWaterLevels,
  insertFlowRate,
  getPowerGenerationLast24Hours,
  insertAlert,
  connect };