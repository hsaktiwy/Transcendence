
import React, { useRef, useEffect } from 'react';
import './Countdown.css'


function Countdown({ onFinish }) {
  const countdownRef = useRef(null);

  useEffect(() => {
    let count = 7;
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
          // Instead of unmounting or calling setState, just call onFinish
          onFinish();
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onFinish]);

  return (
    <div ref={countdownRef} id="countdown" className="countdown-v" />
  );
}

export default Countdown;