function Regles() {
  return (
    <div className="regles-container">
      <h2>Règles du concours</h2>
      <div className="regles-content">
        <div className="regle-item">
          <div className="regle-icon">1</div>
          <div className="regle-text">
            <h3>Une participation par numéro</h3>
            <p>Chaque numéro de téléphone ne peut être inscrit qu'une seule fois</p>
          </div>
        </div>

        <div className="regle-item">
          <div className="regle-icon">2</div>
          <div className="regle-text">
            <h3>Tirage aléatoire et équitable</h3>
            <p>Le tirage sera effectué de manière totalement aléatoire parmi tous les participants</p>
          </div>
        </div>

        <div className="regle-item">
          <div className="regle-icon">3</div>
          <div className="regle-text">
            <h3>Trois gagnants</h3>
            <p>Trois heureux gagnants seront sélectionnés à la fin du concours</p>
          </div>
        </div>

        <div className="regle-item">
          <div className="regle-icon">4</div>
          <div className="regle-text">
            <h3>Les lots à gagner</h3>
            <ul className="lots-list">
              <li>1er gagnant : <strong>25 000 FCFA</strong></li>
              <li>2e gagnant : <strong>10 000 FCFA</strong></li>
              <li>3e gagnant : <strong>5 000 FCFA</strong></li>
            </ul>
          </div>
        </div>

        <div className="regle-item">
          <div className="regle-icon">5</div>
          <div className="regle-text">
            <h3>Annonce des résultats</h3>
            <p>Les résultats seront annoncés après la fin du concours. Les gagnants seront contactés directement</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regles;
