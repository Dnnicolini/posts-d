import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { AuthProvider } from './components/context/AuthContext';
import IndividualPost from './pages/IndividualPost';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
    <ToastContainer />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <Routes className="h-full">
            <Route path="/posts/all-posts" element={<Home />} />
            <Route path="/posts/:uuid" element={<IndividualPost />} />
          </Routes>
          <Footer />

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
