import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import "./Popup.css";
import Home from './page/home';

export default function Popup() {
  useEffect(() => {
    console.log("Hello from the popup!");
  }, []);

  return (
    <div className='popup bg-[#1A1A1A] w-full h-full min-h-screen'>
      <Router>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}
