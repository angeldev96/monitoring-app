import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';

import WaterLevelChart from '../components/WaterLevelChart';
import WaterLevelHistoryChart from '../components/WaterLevelHistoryChart';

export default function WaterLevelChartPage() {
  const [waterLevelData, setWaterLevelData] = useState({ level: null, timestamp: null });
  const [waterLevelHistoryData, setWaterLevelHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWaterLevel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/last-water-level`);
        console.log('response', response.data);
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

    const fetchWaterLevelHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/last-week-water-levels`);
        console.log('response', response.data);
        if (response.data) {
          setWaterLevelHistoryData(response.data);
        }
      } catch (error) {
        console.error('Error fetching water level history:', error);
      }
    };

    fetchWaterLevel();
    fetchWaterLevelHistory();
  }, []);

  const formattedTimestamp = waterLevelData.timestamp ? format(new Date(waterLevelData.timestamp), 'PPPpp') : '';

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h5">Último nivel de agua registrado:</Typography>
          <Typography variant="body1" style={{ fontFamily: 'Arial, sans-serif', fontSize: 16 }}>
            {`${waterLevelData.level}% - ${formattedTimestamp}`}
          </Typography>
          <WaterLevelChart level={waterLevelData.level} />
          <Typography variant="h5" sx={{ mt: 4 }}>Niveles de agua de los últimos 7 días:</Typography>
          <WaterLevelHistoryChart data={waterLevelHistoryData} />
        </>
      )}
    </Container>
  );
}
