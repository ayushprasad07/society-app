import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
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
import UserSignUp from './components/UserSignUp';
import MarketPlace from './components/MarketPlace';
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress,setProgress] = useState(0);
  const [recentNotice, setRecentNotice] = useState(() => {
      const stored = localStorage.getItem("recentNotice");
      return stored ? JSON.parse(stored) : {};
    });
  const [recentEvent, setRecentEvent] = useState(()=>{
    const stored = localStorage.getItem('recentEvent');
    return stored ? JSON.parse(stored):{};
  })


  const updateProgress = (progress)=>{
    setProgress(progress);
  }

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);


  return (
    <Router>
      <Navbar />
      <LoadingBar
        color="#03045e"
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice" element={<Choice />} />
        <Route path='/admin-sign-up' element={<AdminSignUp setProgress={updateProgress}/>}/>
        <Route path='/user-sign-up' element={<UserSignUp setProgress={updateProgress}/>}/>
        <Route path='/admin-page' element={<AdminPage/>}/>
        <Route path='/user-page' element={<UserPage recentNotice={recentNotice} recentEvent={recentEvent} />}/>
        <Route path='/login' element={<Login setProgress={updateProgress}/>}/>
        <Route path='/residents' element={<Residents/>}/>
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/notices' element={<Notices setProgress={updateProgress}  setRecentNotice={setRecentNotice}/>}/>
        <Route path='/events' element={<Events setRecentEvent={setRecentEvent}/>}/>
        <Route path='/market-place' element={<MarketPlace/>}/>
      </Routes>
    </Router>
  );
}

export default App;