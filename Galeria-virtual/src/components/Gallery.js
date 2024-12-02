import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ArtModal from './ArtModal';
import ArtMesh from './ArtMesh';

const artworks = [
  { id: 1, name: 'Retro Computer Setup (FREE)', description: 'Posting a random free prop. I’ll leave it to you to plug it in inside your projects. Open for free use just remember to credit me! Please contact me if you have any questions or business inquiries: bsw2142@gmail.com You Can Also Get A Quote From Me Via Questioneer! Google Forms', model: '/assets/1/scene.gltf' },
  { id: 2, name: 'CRT TV', description: 'Free CRT TV model. Textures are 4k for text sharpness, but it looks fine with 2k.If this helped you, please consider supporting by buying me a coffee. Thanks!', model: '/assets/3/scene.gltf' },
  { id: 3, name: 'Medieval House Low Poly (For Gamedev)', description: 'This is house for you. You can use it for gamedev, texturing, UV unwrap and etc Free downoad. I will be happy if you like it ;) When you will download the model delete a grass. It takes so many triangles.', model: '/assets/2/scene.gltf' },
];

const Gallery = () => {
  const [selectedArt, setSelectedArt] = useState(null);

  return (
    <div style={galleryContainerStyles}>
      <h1 style={galleryTitleStyles}>Galería Virtual</h1>
      {artworks.map((art) => (
        <div 
          key={art.id} 
          style={artCardStyles} 
          onClick={() => setSelectedArt(art)}
        >
          <Suspense fallback={<div>Cargando...</div>}>
            <Canvas style={canvasStyles} camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls enableZoom={false} />
              <ArtMesh art={art} />
            </Canvas>
          </Suspense>
          <div style={artNameStyles}>{art.name}</div>
        </div>
      ))}
      {selectedArt && <ArtModal art={selectedArt} onClose={() => setSelectedArt(null)} />}
    </div>
  );
};

const galleryContainerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '30px',
  backgroundColor: '#f4f4f4',
  padding: '40px',
  boxSizing: 'border-box',
};

const galleryTitleStyles = {
  width: '100%',
  textAlign: 'center',
  marginBottom: '30px',
  color: '#053959',
  fontFamily: '"Poppins", sans-serif',
  fontSize: '2.5rem',
};

const artCardStyles = {
  width: '300px',
  height: '400px',
  backgroundColor: '#fff',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
};

const canvasStyles = {
  height: '80%',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px',
};

const artNameStyles = {
  padding: '15px',
  textAlign: 'center',
  backgroundColor: '#053959',
  color: '#fff',
  fontFamily: '"Poppins", sans-serif',
  fontSize: '1.2rem',
  transition: 'background-color 0.3s',
};

// Animación de hover
artCardStyles['&:hover'] = {
  transform: 'scale(1.05)',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
};

export default Gallery;