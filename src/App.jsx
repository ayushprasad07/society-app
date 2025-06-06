import Home from './components/Home'
import Navbar from './components/Navbar'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration:800,
      once:true
    });
  }, []);
  return (
    <>
      <div>
        <Navbar/>
        <Home/>
      </div>
    </>
  )
}

export default App
