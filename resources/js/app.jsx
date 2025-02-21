import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <Routes className="h-full">
            <Route path="/" element={<Home />} />

          </Routes>
          <Footer />

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
