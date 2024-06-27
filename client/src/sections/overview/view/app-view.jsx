import React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

export default function AppView() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const cardsData = [
    {
      title: 'Monitoreo de nivel de agua',
      description: 'Niveles actuales de agua. Tendencia del nivel (últimas 24h, 7 días). Alertas cuando el nivel es bajo.',
      image: 'https://marketplace-api.looker.com/visualization-screenshots/fill_icon.png',
      path: '/monitoreo-nivel-agua'
    },
    {
      title: 'Monitoreo de caudal',
      description: 'Volumen de agua por turbina en tiempo real. Cálculo de energía potencial. Evolución del caudal promedio.',
      image: 'https://cdn-icons-png.flaticon.com/512/4169/4169832.png',
      path: '/monitoreo-caudal'
    },
    {
      title: 'Monitoreo de potencia generada',
      description: 'Energía eléctrica producida en tiempo real. Producción acumulada en un periodo. Análisis de eficiencia.',
      image: 'https://img.freepik.com/premium-vector/electricity-power-icons-lightning-bolt-with-power-plug-electricity-logo_849264-133.jpg',
      path: '/monitoreo-potencia-generada'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={4}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleCardClick(card.path)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="div">
                    {card.description.split('. ').map((sentence, idx) => (
                      <p key={idx}>{sentence}</p>
                    ))}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
