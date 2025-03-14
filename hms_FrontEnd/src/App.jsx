import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Login1 from './Pages/Login/Login1';
import UserAccount from './Pages/UserAccount/UserAccount';
import RouteTitle from './Components/RouteTitle';
import ApplyForm from './Pages/ApplyForm/ApplyForm';
import Hostel from './Pages/Hostel/Hostel'
import Room from './Pages/Room/Room'
import Asset from './Pages/Asset/Asset'
import Admin from './Pages/Admin/Admin';
import Damage from './Pages/Damage/Damage';
import Student from './Pages/Student/Student';
import Report from './Pages/Report/Report';
import AdminDashBoard from './Pages/AdminDashBoard/AdminDashBoard';
import Add_Student from './Pages/Add_Student/Add_Student';
import Add_Damage from './Pages/Add_Damage/Add_Damage';
import Add_Damage_Case from './Pages/Add_Damage_Case/Add_Damage_Case';
import Add_Asset from './Pages/Add_Asset/Add_Asset';
import Add_Room from './Pages/Add_Room/Add_Room';
import Add_Hostel from './Pages/Add_Hostel/Add_Hostel';
import Select_Student from './Pages/Select_Student/Select_Student';


const App = () => {
  return (
    <Router>
      <RouteTitle/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/login1" element={<Login1/>} />
      </Routes>
      <Routes>
        <Route path="/useraccount" element={<UserAccount/>} />
      </Routes>
      <Routes>
        <Route path="/applyform" element={<ApplyForm/>} />
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
      <Routes>
        <Route path="/add_room" element={<Add_Room/>}/>
      </Routes>
      <Routes>
        <Route path="/add_hostel" element={<Add_Hostel/>}/>
      </Routes>
      <Routes>
        <Route path="/select_student" element={<Select_Student/>}/>
      </Routes>
    </Router>
  );
}

export default App
