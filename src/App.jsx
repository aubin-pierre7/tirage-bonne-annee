import { useState, useEffect } from 'react';
import FormInscription from './components/FormInscription';
import Countdown from './components/Countdown';
import Compteur from './components/Compteur';
import Regles from './components/Regles';
import Footer from './components/Footer';
import './App.css';

const MAX_PARTICIPANTS = 100;
const DATE_FIN_CONCOURS = '2025-12-31T23:59:59';

function App() {
  const [nombreInscrits, setNombreInscrits] = useState(0);
  const [concoursTermine, setConcoursTermine] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Charger le nombre d'inscriptions depuis le backend Django
  const chargerNombreInscrits = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/inscriptions/count/');
      if (!response.ok) throw new Error('Erreur serveur');
      const data = await response.json();
      setNombreInscrits(data.count);
    } catch (error) {
      console.error('Erreur lors du chargement du nombre d\'inscriptions :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerNombreInscrits();
  }, []);

  const handleInscriptionReussie = () => {
    chargerNombreInscrits(); // met à jour le compteur après chaque inscription
  };

  const handleConcoursTermine = () => {
    setConcoursTermine(true);
  };

  const placesRestantes = MAX_PARTICIPANTS - nombreInscrits;

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Tirage au sort – Bonne Année 2025 🎉</h1>
          <p className="hero-subtitle">
            Participez à notre grand tirage au sort de fin d'année et tentez de gagner jusqu'à 25 000 FCFA !
            Inscription gratuite et rapide.
          </p>
        </div>
      </header>

      <main className="main-content">
        <section className="section-countdown">
          <Countdown
            dateFin={DATE_FIN_CONCOURS}
            onConcoursTermine={handleConcoursTermine}
          />
        </section>

        <section className="section-compteur">
          {loading ? (
            <div className="loading">Chargement...</div>
          ) : (
            <Compteur
              nombreInscrits={nombreInscrits}
              maxParticipants={MAX_PARTICIPANTS}
            />
          )}
        </section>

        <section className="section-formulaire">
          <h2>Inscrivez-vous maintenant</h2>
          <FormInscription
            concoursTermine={concoursTermine}
            placesRestantes={placesRestantes}
            onInscriptionReussie={handleInscriptionReussie}
          />
        </section>

        <section className="section-regles">
          <Regles />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
