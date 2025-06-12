import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Choice from './components/Choice';
import AdminSignUp from './components/AdminSignUp';
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import UserPage from './components/UserPage';
import Residents from './components/Residents';
import Requests from './components/Requests';
import Notices from './components/Notices';
import Events from './components/Events';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice" element={<Choice />} />
        <Route path='/admin-sign-up' element={<AdminSignUp/>}/>
        <Route path='/admin-page' element={<AdminPage/>}/>
        <Route path='/user-page' element={<UserPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/residents' element={<Residents/>}/>
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/notices' element={<Notices/>}/>
        <Route path='/events' element={<Events/>}/>
      </Routes>
    </Router>
  );
}

export default App;