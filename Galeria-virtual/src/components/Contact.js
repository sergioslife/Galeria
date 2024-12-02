import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const Contact = () => {
  return (
    <Box sx={contactContainerStyles}>
      <Typography variant="h4" gutterBottom style={titleStyles}>
        Contacto
      </Typography>
      <Typography variant="body1" gutterBottom style={descriptionStyles}>
        ¡Conéctate con nosotros a través de nuestras redes sociales!
      </Typography>
      <Box sx={iconContainerStyles}>
        <IconButton href="https://facebook.com" target="_blank" sx={iconStyles}>
          <Facebook />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" sx={iconStyles}>
          <Instagram />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" sx={iconStyles}>
          <Twitter />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank" sx={iconStyles}>
          <LinkedIn />
        </IconButton>
      </Box>
    </Box>
  );
};

// Estilos
const contactContainerStyles = {
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)', // Ajusta para cubrir el área debajo del navbar
  marginTop: '64px', // Deja espacio para que no se solape con el navbar
  backgroundColor: '#f9f9f9', // Fondo claro para resaltar el contenido
  textAlign: 'center',
};

const titleStyles = {
  fontWeight: 'bold',
  fontSize: '2rem',
  color: '#333',
  marginBottom: '20px', // Espacio debajo del título
};

const descriptionStyles = {
  color: '#666',
  fontSize: '1rem',
  marginBottom: '40px', // Espacio debajo de la descripción
};

const iconContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px', // Espacio entre los iconos
};

const iconStyles = {
  backgroundColor: '#fff', // Fondo blanco para cada icono
  borderRadius: '50%', // Iconos circulares
  padding: '12px', // Espaciado dentro del icono
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra suave
  '&:hover': {
    backgroundColor: '#007BFF', // Cambio de color al pasar el ratón
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Sombra más fuerte al hacer hover
  },
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Animación suave en el hover
};

export default Contact;
