import { useEffect, useRef } from "react";
import './Countdown.css'

export default function Countdown({ onComplete }) {
    const countdownRef = useRef(null);
  
    useEffect(() => {
      let count = 3;
      if (countdownRef.current) {
        countdownRef.current.textContent = count;
      }
      const intervalId = setInterval(() => {
        count--;
        if (countdownRef.current) {
          if (count > 0) {
            countdownRef.current.textContent = count;
          } else {
            clearInterval(intervalId);
            onComplete(); // Let the parent know you finished
          }
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return <div ref={countdownRef} id="countdown" className="countdown-v" />;
}