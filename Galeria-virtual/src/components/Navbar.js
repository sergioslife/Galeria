import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#053959',
        zIndex: 998,
        transition: 'transform 0.3s ease-in-out',
        transform: scrolled ? 'translateY(-100%)' : 'translateY(0)', // Scroll animation
      }}
    >
      <Toolbar sx={{ padding: 0, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Título de la Navbar con animación */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h6" sx={{ paddingLeft: 3 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Galería Virtual de Arte
            </Link>
          </Typography>
        </motion.div>

        {/* Contenedor de los botones */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '50%' }}>
          <Button color="inherit" component={Link} to="/" sx={{ color: 'white', width: '100%', textAlign: 'center' }}>
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/galeria" sx={{ color: 'white', width: '100%', textAlign: 'center' }}>
            Galería
          </Button>
          <Button color="inherit" component={Link} to="/contacto" sx={{ color: 'white', width: '100%', textAlign: 'center' }}>
            Contacto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
