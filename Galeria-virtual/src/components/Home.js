import React, { useRef, useState, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Componente de Home
const Home = () => {
  // Generar un color aleatorio en formato RGB dentro del componente
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Usar useMemo dentro del componente Home
  const randomColor = useMemo(() => getRandomColor(), []); // Genera el color solo una vez

  // Componente de Cubo interactivo
  const BoxComponent = (props) => {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    // Suscribir el componente al bucle de renderizado para rotar el cubo cada frame
    useFrame((state, delta) => {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    });

    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : randomColor} />
      </mesh>
    );
  };

  return (
    <Box sx={homeContainerStyles}>
      <Box sx={textBoxStyles}>
        <Typography variant="h2" component="h1" gutterBottom style={titleStyles}>
          Bienvenido a la Galería Virtual de Arte
        </Typography>
        <Typography variant="body1" style={descriptionStyles}>
          Explora modelos 3D de arte digital innovador, disfruta de una experiencia inmersiva y descubre nuevas perspectivas artísticas.
        </Typography>
      </Box>
      <Box sx={canvasContainerStyles}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <OrbitControls />
          {/* Cubos interactivos */}
          <BoxComponent position={[-1.2, 0, 0]} />
          <BoxComponent position={[1.2, 0, 0]} />
        </Canvas>
      </Box>
    </Box>
  );
};

// Estilos
const homeContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '40px',
  gap: '40px',
  minHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: '#f5f5f5', // Fondo claro para un diseño moderno
};

const textBoxStyles = {
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const titleStyles = {
  fontWeight: 'bold',
  fontSize: '2rem',
  color: '#333',
};

const descriptionStyles = {
  color: '#666',
  fontSize: '1rem',
};

const canvasContainerStyles = {
  width: '50%',
  height: '400px',
  backgroundColor: '#fff', // Fondo blanco para destacar el canvas
  borderRadius: '8px', // Bordes redondeados para suavizar el diseño
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra suave para darle un toque de profundidad
};

export default Home;
