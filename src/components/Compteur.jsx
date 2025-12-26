function Compteur({ nombreInscrits, maxParticipants }) {
  const placesRestantes = maxParticipants - nombreInscrits;
  const pourcentage = (nombreInscrits / maxParticipants) * 100;

  return (
    <div className="compteur-container">
      <div className="compteur-stats">
        <div className="stat-item">
          <span className="stat-value">{nombreInscrits}</span>
          <span className="stat-label">Participants inscrits</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{placesRestantes}</span>
          <span className="stat-label">Places restantes</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${Math.min(pourcentage, 100)}%` }}
        ></div>
      </div>

      <p className="progress-text">
        {pourcentage >= 100
          ? 'Toutes les places sont prises !'
          : `${pourcentage.toFixed(0)}% des places occupées`
        }
      </p>
    </div>
  );
}

export default Compteur;
