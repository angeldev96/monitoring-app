import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // Paso 1: Importar useNavigate de react-router-dom

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress'; // Paso 2: Importar IconButton
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Paso 3: Importar ArrowBackIcon

import WaterLevelChart from '../components/WaterLevelChart';

export default function WaterLevelChartPage() {
  const [waterLevel, setWaterLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Paso 4: Inicializar useNavigate

  useEffect(() => {
    const fetchWaterLevel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/last-water-level`);
        if (response.data && response.data.length > 0) {
          setWaterLevel(response.data[0].level);
        }
      } catch (error) {
        console.error('Error fetching water level:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWaterLevel();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}> {/* Paso 5: Agregar IconButton para navegar hacia atrás */}
          <ArrowBackIcon />
        </IconButton>
      </Box>
      {loading ? (
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <WaterLevelChart level={waterLevel} />
      )}
    </Container>
  );
}