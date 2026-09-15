import { useEffect, useState } from 'react';

// Формат фиксирован и не зависит от языка интерфейса.
export function moscowTime(): string {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Moscow',
  }).format(new Date());
}

export function useMoscowClock(): string {
  const [time, setTime] = useState(moscowTime);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(moscowTime());
    }, 30_000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return time;
}
