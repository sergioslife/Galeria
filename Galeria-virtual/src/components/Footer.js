import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%', // Ensures it spans the full width
        textAlign: 'center',
        padding: 2,
        backgroundColor: '#053959', // Adjusted background color
        color: 'white',
        zIndex: 998,
        transition: 'transform 0.3s ease-in-out', // Transition for smooth animation
        transform: scrolled ? 'translateY(100%)' : 'translateY(0)', // Scroll animation effect
      }}
    >
      <Typography variant="body2">
        © 2024 Galería Virtual de Arte. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
