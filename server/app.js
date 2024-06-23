const express = require('express');
const db = require('./src/config/database');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();


const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*', // Use the environment variable
    methods: ['GET', 'POST', 'PUT', 'DELETE'],        // Allow specific methods
    credentials: true                 // To allow sending of cookies
  }));

app.get('/water-levels', async (req, res) => {
  try {
    const levels = await db.getWaterLevelsLast24Hours();
    res.json(levels);
  } catch (error) {
    console.error('Error al obtener niveles de agua:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.listen(3001, async () => {
    console.log('Server is running on port 3001');
    await db.connect();
    
   
  });
