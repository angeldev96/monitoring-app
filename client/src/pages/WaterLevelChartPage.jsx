import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // Asumiendo que se ha instalado date-fns

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';

import WaterLevelChart from '../components/WaterLevelChart';

export default function WaterLevelChartPage() {
  const [waterLevelData, setWaterLevelData] = useState({ level: null, timestamp: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWaterLevel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/last-water-level`);
        if (response.data && response.data.length > 0) {
          setWaterLevelData({
            level: response.data[0].level,
            timestamp: response.data[0].timestamp,
          });
        }
      } catch (error) {
        console.error('Error fetching water level:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWaterLevel();
  }, []);

  const formattedTimestamp = waterLevelData.timestamp ? format(new Date(waterLevelData.timestamp), 'PPPpp') : '';

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
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
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Último nivel de agua registrado: {waterLevelData.level} - {formattedTimestamp}
          </Typography>
          <WaterLevelChart level={waterLevelData.level} />
        </>
      )}
    </Container>
  );
}