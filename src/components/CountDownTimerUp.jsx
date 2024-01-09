import React, { useEffect, useRef, useState } from 'react';

import CountDownCard from './CountDownCard';

const CountDownTimerUp = () => {
  //card ref
  const SecondsCardReff = useRef(null);
  const MinutesCardReff = useRef(null);
  const HoursCardReff = useRef(null);
  const DaysCardReff = useRef(null);
  const YearsCardReff = useRef(null);

  //state
  const [years, setYears] = useState(null);
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    let secondsLocal = seconds;
    minutes === 60 && setMinutes(0);
    if (secondsLocal === 59) {
      setSeconds(0);
      secondsLocal = 0;
    }
    if (seconds && secondsLocal < 59) {
      setTimeout(() => {
        setSeconds(secondsLocal + 1);
        SecondsCardReff.current.classList.toggle('rotate');
      }, 1000);
    }
    if (seconds === 59 && minutes < 60) {
      setMinutes(minutes + 1);
      MinutesCardReff.current.classList.toggle('rotate');
    }
  }, [seconds, minutes]);

  useEffect(() => {
    hours === 24 &&
      setDays(days + 1) &&
      DaysCardReff.current.classList.toggle('rotate');
  }, [hours, days]);

  useEffect(() => {
    hours === 24 && setHours(0);
    if (minutes === 60 && hours < 24) {
      setHours(hours + 1);
      HoursCardReff.current.classList.toggle('rotate');
    }
  }, [minutes, hours]);

  useEffect(() => {
    const yearsLocal = years;
    if (days === 365) {
      setDays(0);
      setYears(yearsLocal + 1);
      DaysCardReff.current.classList.toggle('rotate');
      YearsCardReff.current.classList.toggle('rotate');
    }
  }, [years, days]);

  useEffect(() => {
    const seconds = obtainSeconds();
    const date = transformSeconds(seconds);
    setYears(date.years);
    setDays(date.days);
    setHours(date.hours);
    setMinutes(date.minutes);
    setSeconds(date.seconds);
  }, []);

  const transformSeconds = secondsGlobal => {
    let totalOfSeconds = secondsGlobal;
    let years = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;

    if (totalOfSeconds > 31556926) {
      years = Math.floor(totalOfSeconds / 31556926);
      totalOfSeconds = totalOfSeconds - 31556926 * years;
    }

    if (totalOfSeconds > 86400) {
      days = Math.floor(totalOfSeconds / 86400);
      totalOfSeconds = totalOfSeconds - 86400 * days;
    }

    if (totalOfSeconds > 3600) {
      hours = Math.floor(totalOfSeconds / 3600);
      totalOfSeconds = totalOfSeconds - 3600 * hours;
    }

    if (totalOfSeconds > 60) {
      minutes = Math.floor(totalOfSeconds / 60);
      totalOfSeconds = totalOfSeconds - 60 * minutes;
    }

    return {
      years: years,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: totalOfSeconds,
    };
  };

  const obtainSeconds = () => {
    // Fecha inicial (puedes establecer la fecha que desees)
    const initialDate = new Date('2021-03-21T22:00:00Z'); // Formato: Año-Mes-DíaTHora:Minuto:SegundoZ

    // Fecha actual
    const actualDate = new Date();

    // Calcular la diferencia en milisegundos
    const diffInMiliseconds = actualDate - initialDate;

    // Convertir la diferencia a segundos
    const seconds = Math.floor(diffInMiliseconds / 1000);

    return Math.round(seconds, 0);
  };
  return (
    <div className="countdown__containerup">
      <CountDownCard label="Años" number={years} cardRef={YearsCardReff} />
      <CountDownCard label="Días" number={days} cardRef={DaysCardReff} />
      <CountDownCard label="Horas" number={hours} cardRef={HoursCardReff} />
      <CountDownCard
        label="Minutos"
        number={minutes}
        cardRef={MinutesCardReff}
      />
      <CountDownCard
        label="Segundos"
        number={seconds}
        cardRef={SecondsCardReff}
      />
    </div>
  );
};

export default CountDownTimerUp;
