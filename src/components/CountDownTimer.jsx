/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import CountDownCard from './CountDownCard';

const CountDownTimer = ({ setActive }) => {
  //card ref
  const SecondsCardRef = useRef(null);
  const MinutesCardRef = useRef(null);
  const HoursCardRef = useRef(null);
  const DaysCardRef = useRef(null);
  //state
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      setActive(true);
      return;
    }
    seconds === 0 && setSeconds(59);
    if (hours !== 0 && days !== 0) minutes === 0 && setMinutes(59);
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
        SecondsCardRef.current.classList.toggle('rotate');
      }, 1000);
    }
    if (seconds === 0 && minutes > 0) {
      setMinutes(minutes - 1);
      MinutesCardRef.current.classList.toggle('rotate');
    }
  }, [seconds, minutes]);

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return;
    }
    hours === 0 && days !== 0 && setHours(23);
    if (minutes === 0 && hours > 0) {
      setHours(hours - 1);
      HoursCardRef.current.classList.toggle('rotate');
    }
  }, [minutes, hours]);

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return;
    }
    hours === 0 &&
      days !== 0 &&
      setDays(days - 1) &&
      DaysCardRef.current.classList.toggle('rotate');
  }, [hours, days]);

  useEffect(() => {
    const seconds = obtainSeconds();
    const date = transformSeconds(seconds);
    setDays(date.days);
    setHours(date.hours);
    setMinutes(date.minutes);
    setSeconds(date.seconds);
  }, []);

  const transformSeconds = secondsGlobal => {
    if (secondsGlobal === 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    let totalOfSeconds = secondsGlobal;
    let days = 0;
    let hours = 0;
    let minutes = 0;
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
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: totalOfSeconds,
    };
  };

  const obtainSeconds = () => {
    // Obtener la fecha y hora actual
    const actualDate = new Date();
    const gmtOffset = actualDate.getTimezoneOffset() / 60;
    let hourToStart = 20;
    if (gmtOffset === 6) {
      hourToStart = 21;
    } else if (gmtOffset === 5) {
      hourToStart = 22;
    }

    if (actualDate.getHours() === hourToStart) return 0;

    // Crear una nueva fecha para el próximo día 21
    const next21 = new Date();
    next21.setHours(hourToStart, 0, 0, 0);

    // Verificar si el próximo día 21 ya pasó en este mes
    if (actualDate.getDate() >= 21) {
      next21.setMonth(next21.getMonth() + 1); // Avanzar al próximo mes
    }

    // Calcular la diferencia de tiempo en milisegundos
    const timeInMiliseconds = next21 - actualDate;

    // Convertir la diferencia de tiempo a segundos
    const seconds = timeInMiliseconds / 1000;

    return Math.round(seconds, 0);
  };
  return (
    <div className="countdown__container">
      <CountDownCard label="Días" number={days} cardRef={DaysCardRef} />
      <CountDownCard label="Horas" number={hours} cardRef={HoursCardRef} />
      <CountDownCard
        label="Minutos"
        number={minutes}
        cardRef={MinutesCardRef}
      />
      <CountDownCard
        label="Segundos"
        number={seconds}
        cardRef={SecondsCardRef}
      />
    </div>
  );
};

export default CountDownTimer;
