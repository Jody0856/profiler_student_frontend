import './App.css';
import Sidebar from './Sidebar'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Kategorisasi from './Kategorisasi';
import Hasil from './Hasil';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        {/* Sidebar */}  
        <Sidebar />

        {/* Konten Utama */}
        <div style={{ flex: 1, padding: '20px', marginLeft: '270px' }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Kategorisasi" element={<Kategorisasi />} />
            <Route path="/Hasil" element={<Hasil />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
