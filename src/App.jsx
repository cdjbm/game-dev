import './css/app.css';

import CountDownTimer from './components/CountDownTimer';
import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

//importing styles

const App = () => {
  const [active, setActive] = useState(false);
  const { width, height } = useWindowSize();
  const date = new Date();
  const actualHour = date.getHours();
  const gmtOffset = date.getTimezoneOffset() / 60;
  let hourToStart = 19;
  if (gmtOffset === 6) {
    hourToStart = 20;
  } else if (gmtOffset === 5) {
    hourToStart = 21;
  }

  return (
    <div className="app-container">
      {(actualHour === hourToStart || active) && (
        <Confetti width={width} height={height} />
      )}
      <div className="container">
        <main>
          <h2>Tiempo para proxima clase:</h2>
          <CountDownTimer setActive={setActive} />
        </main>
      </div>
    </div>
  );
};

export default App;
