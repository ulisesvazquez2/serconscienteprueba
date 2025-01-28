import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import axios from 'axios';

const HistoryTimeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  
  const BACK_URL = process.env.REACT_APP_BACKEND_URL + "eventos_timeline"; 
  
  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await axios.get(BACK_URL);
        setTimelineData(response.data); // Establecer los datos recibidos
      } catch (error) {
        console.error("Error al obtener los datos de la línea de tiempo", error);
      }
    };
    fetchTimelineData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '16px' }}
      >
        Historia de Ser Consciente
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Timeline position="alternate">
          {timelineData.length > 0 ? (
            timelineData.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={event.color} />
                  {index < timelineData.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="div">
                    {event.titulo} - {event.year}
                  </Typography>
                  <Typography color="textSecondary">
                    {event.descripcion}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No hay eventos disponibles.
            </Typography>
          )}
        </Timeline>
      </Paper>
    </Container>
  );
};

export default HistoryTimeline;
