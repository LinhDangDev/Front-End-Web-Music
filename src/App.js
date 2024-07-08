import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './component/NavBar';
import Loader from './component/Loader';
import SearchMode from './component/SearchMode';
import Main from './component/Main';
import HeaderHero from './component/HeaderHero';
import SupportChatMode from './component/SupportChatMode';
import Footer from './component/Footer';
import Backtotop from './component/Backtotop';
import Songs from './component/Song';
import Artists from './component/Artist';
function App() {
  return (
    <Router> {/* Bọc component App với Router */}
    <div className="App">
      <Loader />
      <NavBar />
      <SupportChatMode />
      <SearchMode />
      <HeaderHero />
      <Routes> {/* Sử dụng component Routes để định nghĩa các route */}
        <Route path="/" element={<Main />} /> {/* Route mặc định cho trang chủ */}
        <Route path="/post/:songId" element={<Songs  />} /> {/* Route cho trang bài hát */}
        <Route path="/user/:artistId" element={<Artists />} /> {/* Route cho trang nghệ sĩ */}
      </Routes>
      <Footer />
      <Backtotop />
    </div>
  </Router>
    
  );
}

export default App;
