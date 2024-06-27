import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress'; // Paso 1: Importar Box

import WaterLevelChart from '../components/WaterLevelChart';

export default function WaterLevelChartPage() {
  const [waterLevel, setWaterLevel] = useState(null);
  const [loading, setLoading] = useState(true);

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
        // setTimeout(() => {
          setLoading(false);
        // }, 3000);
      }
    };

    fetchWaterLevel();
  }, []);

  return (
    <Container maxWidth="xl">
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
