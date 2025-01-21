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
import Add_Student from './Pages/Add_Student/Add_Student';
import Add_Damage from './Pages/Add_Damage/Add_Damage';
import Add_Damage_Case from './Pages/Add_Damage_Case/Add_Damage_Case';
import Add_Asset from './Pages/Add_Asset/Add_Asset';

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
      <Routes>
        <Route path="/add_student" element={<Add_Student/>}/>
      </Routes>
      <Routes>
        <Route path="/add_damage" element={<Add_Damage/>}/>
      </Routes>
      <Routes>
        <Route path="/add_damage_case" element={<Add_Damage_Case/>}/>
      </Routes>
      <Routes>
        <Route path="/add_asset" element={<Add_Asset/>}/>
      </Routes>
    </Router>
  );
}

export default App
