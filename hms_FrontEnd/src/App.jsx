import react from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Pages/Home/Home'
import Hostel from './Pages/Hostel/Hostel'
import Room from './Pages/Room/Room'
import Asset from './Pages/Asset/Asset'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      
      <Routes>
        <Route path="/hostel" element={<Hostel/>}/>
      </Routes>
      <Routes>
        <Route path="/room" element={<Room/>}/>
      </Routes>
      <Routes>
        <Route path="/asset" element={<Asset/>}/>
      </Routes>
    </Router>
  );
}

export default App
