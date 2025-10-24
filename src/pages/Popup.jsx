import { useEffect } from 'react';
import "./Popup.css";

export default function() {
  useEffect(() => {
    console.log("Hello from the popup!");
  }, []);

  return (
    <div className='bg-[#1A1A1A] rounded-2xl'>
      <img src="/icon-with-shadow.svg" />
     <h1>Hi</h1> 
    </div>
  )
} 
