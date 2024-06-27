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
      description: 'Muestra el nivel del río en tiempo real. Presenta la tendencia del nivel de agua a lo largo del tiempo (últimas 24 horas, 7 días, etc.). Genera alertas cuando el nivel de agua desciende por debajo de un umbral preestablecido, lo que podría afectar la producción de energía.',
      image: 'https://marketplace-api.looker.com/visualization-screenshots/fill_icon.png',
      path: '/monitoreo-nivel-agua'
    },
    {
      title: 'Monitoreo de caudal',
      description: 'Registra el volumen de agua que fluye por la turbina en tiempo real. Permite calcular la energía potencial generada por la planta. Visualiza el caudal promedio y su evolución a lo largo del tiempo.',
      image: 'https://cdn-icons-png.flaticon.com/512/4169/4169832.png',
      path: '/monitoreo-caudal'
    },
    {
      title: 'Monitoreo de potencia generada',
      description: 'Muestra la cantidad de energía eléctrica que se produce en tiempo real. Presenta la producción de energía acumulada durante un periodo específico. Facilita el análisis de la eficiencia de la planta.',
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
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
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
