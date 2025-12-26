function Resultats({ gagnants }) {
  if (!gagnants || gagnants.length === 0) return null;

  return (
    <section className="section-resultats">
      <h2>🎉 Résultats du concours</h2>
      <div className="gagnants-list">
        {gagnants.map((gagnant, index) => (
          <div key={index} className="gagnant-item">
            {gagnant.photo && (
              <img
                src={gagnant.photo} // url ou chemin relatif dans public/images/
                alt={gagnant.prenom}
                className="gagnant-photo"
              />
            )}
            <div className="gagnant-info">
              <h3>{gagnant.prenom}</h3>
              <p>Lot gagné : {gagnant.lot} FCFA</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Resultats;
