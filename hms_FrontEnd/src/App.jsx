import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Pages/Home/Home'
import Hostel from './Pages/Hostel/Hostel'
import Room from './Pages/Room/Room'
import Asset from './Pages/Asset/Asset'
import Admin from './Pages/Admin/Admin'
import Damage from './Pages/Damage/Damage'
import Student from './Pages/Student/Student'
import Report from './Pages/Report/Report'
import AdminDashBoard from './Pages/AdminDashBoard/AdminDashBoard';
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
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
      <Routes>
        <Route path="/damage" element={<Damage/>}/>
      </Routes>
      <Routes>
        <Route path="/student" element={<Student/>}/>
      </Routes>
      <Routes>
        <Route path="/report" element={<Report/>}/>
      </Routes>
      <Routes>
        <Route path="/admindashboard" element={<AdminDashBoard/>}/>
      </Routes>
    </Router>
  );
}

export default App
