import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the modified Navbar
import Gallery from './components/Gallery'; // Import the Gallery component
import Home from './components/Home'; // Import the Home component
import Contact from './components/Contact'; // Import the Contact component
import Footer from './components/Footer'; // Import the Footer component

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
