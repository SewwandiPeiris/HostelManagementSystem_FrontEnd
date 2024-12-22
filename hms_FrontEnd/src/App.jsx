import react from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Pages/Home/Home'
import Login from './Pages/Login/Login';
import UserAccount from './Pages/UserAccount/UserAccount';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/useraccount" element={<UserAccount/>} />
      </Routes>
    </Router>
  );
}

export default App
