import react from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Pages/Home/Home'
import Hostel from './Pages/Hostel/Hostel'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/hostel" element={<Hostel/>}/>
      </Routes>
    </Router>
  );
}

export default App
