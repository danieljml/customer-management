import './App.css';
import { Routes, Route } from 'react-router-dom';
import CustomeBar from './components/navigationBar/navigationBar';
import { Home } from './pages/Home';
import Title from './components/title/title';

function App() {
  return (
      <div className="App">
        <CustomeBar />
        <Routes>
          <Route path="/" element={<Home />} end />
          <Route path="/productos" element={<Title />} />
          <Route path="/nosotros" element={<Title />} />
          <Route path="/servicios" element={<Title />} />
          <Route path="/contactos" element={<Title />} />
        </Routes>
      </div>
  );
}

export default App;
