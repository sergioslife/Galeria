import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Estilos
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1050,
  overflow: 'auto',
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '80%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflowY: 'auto',
  zIndex: 1060,
};

const modalBodyStyles = { display: 'flex', flexDirection: 'column', alignItems: 'center' };
const modelStyles = { width: '100%', height: '40vh', marginBottom: '20px' };
const infoStyles = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' };
const inputStyles = { width: '100%', padding: '8px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' };
const textareaStyles = { ...inputStyles, height: '100px' };
const commentButtonStyles = { backgroundColor: '#007BFF', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' };
const commentsSectionStyles = { marginTop: '20px', padding: '10px', borderTop: '1px solid #ccc', maxHeight: '200px', overflowY: 'auto' };
const commentItemStyles = { marginBottom: '10px' };
const backButtonContainer = { display: 'flex', justifyContent: 'center', marginTop: '20px' };
const backButtonStyles = { backgroundColor: '#007BFF', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' };

// Componente para el modelo 3D
const ArtModel = ({ model }) => {
  const { scene } = useGLTF(model);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const scale = 1 / Math.max(size.x, size.y, size.z);
    scene.scale.set(scale, scale, scale);
    scene.position.set(0, -size.y * scale / 2, 0);
  }, [scene]);

  return <primitive object={scene} />;
};

// Componente principal del modal
const ArtModal = ({ art, onClose }) => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(art.id)) || [];
    setComments(storedComments);
  }, [art]);

  const handleCommentSubmit = () => {
    if (username.trim() && comment.trim()) {
      const newComment = { user: username, text: comment };
      const newComments = [...comments, newComment];
      setComments(newComments);
      localStorage.setItem(art.id, JSON.stringify(newComments));
      setComment('');
    } else {
      alert('Por favor ingresa un nombre de usuario y un comentario.');
    }
  };

  return ReactDOM.createPortal(
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <div style={modalBodyStyles}>
          <div style={modelStyles}>
            <Canvas style={{ width: '100%', height: '40vh' }} camera={{ position: [3, 3, 3], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.7} />
              <pointLight position={[-10, -10, -10]} intensity={0.7} />
              <Suspense fallback={<Html>Loading...</Html>}>
                <ArtModel model={art.model} />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
          <div style={infoStyles}>
            <h2>{art.name}</h2>
            <p>{art.description}</p>
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                style={inputStyles}
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Deja tu comentario..."
                rows="4"
                style={textareaStyles}
              />
              <button onClick={handleCommentSubmit} style={commentButtonStyles}>
                Comentar
              </button>
              <div style={commentsSectionStyles}>
                <h3>Comentarios:</h3>
                <ul>
                  {comments.map((com, index) => (
                    <li key={index} style={commentItemStyles}>
                      <strong>{com.user}:</strong> {com.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div style={backButtonContainer}>
          <button onClick={onClose} style={backButtonStyles}>Volver</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ArtModal;
