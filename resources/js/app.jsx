import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.css'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes className="h-full">
        <Route path="/" element={<Home />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
