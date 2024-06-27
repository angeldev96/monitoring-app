import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import WaterLevelChart from '../components/WaterLevelChart';

export default function WaterLevelChartPage() {
  const [waterLevel, setWaterLevel] = useState(null);

  useEffect(() => {
    const fetchWaterLevel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/last-water-level`);
        if (response.data && response.data.length > 0) {
          setWaterLevel(response.data[0].level);
        }
      } catch (error) {
        console.error('Error fetching water level:', error);
      }
    };

    fetchWaterLevel();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      {waterLevel !== null ? (
        <WaterLevelChart level={waterLevel} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}