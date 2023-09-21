import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModalA from './components/modal/ModalA';
import ModalB from './components/modal/ModalB';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './components/Home';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/modalA" element={<ModalA />} />
          <Route path="/modalB" element={<ModalB />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;