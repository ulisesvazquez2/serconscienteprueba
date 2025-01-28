import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '48px', 
    flexDirection: 'row',
    '@media (max-width: 960px)': {  
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  section: {
    flex: 1,
    padding: '32px', 
    borderRadius: '8px',
    position: 'relative',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    '&:hover': {
      transform: 'translateY(2px)',
      opacity: 0.9,
    },
    marginRight: '24px',  // Agregar margen horizontal entre los papeles
    '@media (max-width: 960px)': {
      marginBottom: '32px',
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
  title: {
    fontSize: '2rem',
    fontWeight: 900,
    marginBottom: '16px',  
    color: '',  
  },
  description: {
    fontSize: '1.1rem',
    color: '',
    lineHeight: 1.6,
    '@media (max-width: 960px)': {  
      fontSize: '1rem',
    },
  },
  divider: {
    height: '100%',
    borderLeft: '2px solid #ccc',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    '@media (max-width: 960px)': {  
      display: 'none',
    },
  },
}));

const MisionVision = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {/* Misión */}
      <Paper className={classes.section}>
        <Typography variant="h4" className={classes.title}>
          Misión
        </Typography>
        <Typography className={classes.description}>
          Brindar un espacio de autoconocimiento y bienestar integral que combine las herramientas del psicoanálisis y el tarot, ayudando a nuestros clientes a explorar su mundo interior, resolver conflictos emocionales y encontrar orientación en sus decisiones, todo en un ambiente profesional, respetuoso y empático.
        </Typography>
      </Paper>

      {/* Visión */}
      <Paper className={classes.section}>
        <Typography variant="h4" className={classes.title}>
          Visión
        </Typography>
        <Typography className={classes.description}>
          Ser reconocidos como un referente en el acompañamiento emocional y espiritual, integrando enfoques tradicionales y contemporáneos para promover el desarrollo personal y la transformación positiva de quienes buscan comprenderse a sí mismos y alcanzar su máximo potencial.
        </Typography>
      </Paper>
    </Box>
  );
};

export default MisionVision;