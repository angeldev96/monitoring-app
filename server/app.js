const express = require('express');
const db = require('./src/config/database');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();


const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite métodos específicos
  credentials: true // Permite el envío de cookies
}));

app.get('/last-water-level', async (req, res) => {
  try {
    const levels = await db.getLastWaterLevels();
    res.json(levels);
  } catch (error) {
    console.error('Error al obtener niveles de agua:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/last-week-water-levels', async (req, res) => {
  try {
    const levels = await db.getLastWeekWaterLevels();
    res.json(levels);
  } catch (error) {
    console.error('Error al obtener niveles de agua de la última semana:', error);
    res.status(500).send('Error interno del servidor');
  }
}
);


app.listen(3001, async () => {
    console.log('Server is running on port 3001');
    await db.connect();
    
   
  });
