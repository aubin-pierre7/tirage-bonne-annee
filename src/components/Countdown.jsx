import { useState, useEffect } from 'react';

function Countdown({ dateFin, onConcoursTermine }) {
  const [timeLeft, setTimeLeft] = useState({
    jours: 0,
    heures: 0,
    minutes: 0,
    secondes: 0
  });
  const [termine, setTermine] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(dateFin) - new Date();

      if (difference <= 0) {
        setTermine(true);
        if (onConcoursTermine) {
          onConcoursTermine();
        }
        return {
          jours: 0,
          heures: 0,
          minutes: 0,
          secondes: 0
        };
      }

      return {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [dateFin, onConcoursTermine]);

  if (termine) {
    return (
      <div className="countdown-container">
        <h3>Le concours est terminé</h3>
        <p>Les résultats seront annoncés bientôt !</p>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <h3>Temps restant</h3>
      <div className="countdown">
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.jours}</span>
          <span className="countdown-label">Jours</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.heures}</span>
          <span className="countdown-label">Heures</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.minutes}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-value">{timeLeft.secondes}</span>
          <span className="countdown-label">Secondes</span>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
