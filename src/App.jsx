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
import SellerPage from './components/SellerPage';
import AdminMarketPlace from './components/AdminMarketPlace';
import Cart from './components/Cart';

function App() {
  const [progress,setProgress] = useState(0);
  const [recentNotice, setRecentNotice] = useState(() => {
    try {
      const stored = localStorage.getItem("recentNotice");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Invalid recentNotice in localStorage", e);
      return null;
    }
  });

  const [recentEvent, setRecentEvent] = useState(() => {
    try {
      const stored = localStorage.getItem("recentEvent");
      const parsed = stored && stored !== "undefined" ? JSON.parse(stored) : null;
      return parsed && parsed.eventImage ? parsed : null;
    } catch (e) {
      console.error("Invalid recentEvent in localStorage", e);
      return null;
    }
  });

  const [recentItem, setRecentItem] = useState(() => {
    try {
      const stored = localStorage.getItem("recentItem");
      const parsed = stored && stored !== "undefined" ? JSON.parse(stored) : null;
      return parsed && parsed.itemImage ? parsed : null;
    } catch (e) {
      console.error("Invalid recentItem in localStorage", e);
      return null;
    }
  });

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
        <Route path='/user-page' element={<UserPage recentNotice={recentNotice} recentEvent={recentEvent} recentItem={recentItem} />}/>
        <Route path='/login' element={<Login setProgress={updateProgress}/>}/>
        <Route path='/residents' element={<Residents setProgress={updateProgress}/>}/>
        <Route path='/requests' element={<Requests setProgress={updateProgress}/>}/>
        <Route path='/notices' element={<Notices setProgress={updateProgress}  setRecentNotice={setRecentNotice}/>}/>
        <Route path='/events' element={<Events setRecentEvent={setRecentEvent} setProgress={updateProgress}/>}/>
        <Route path='/market-place' element={<MarketPlace setRecentItem={setRecentItem}/>}/>
        <Route path='/seller' element={<SellerPage setProgress={updateProgress}/>}/>
        <Route path='/admin-markte-place' element={<AdminMarketPlace/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Router>
  );
}

export default App;