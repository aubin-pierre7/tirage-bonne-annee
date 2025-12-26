import { useState } from 'react';

function FormInscription({ concoursTermine, placesRestantes, onInscriptionReussie }) {
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [operateur, setOperateur] = useState('Orange Money');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Validation simple du numéro (ex: Cameroun)
  const validerTelephone = (tel) => {
    const regex = /^(\+?237|237)?[6][0-9]{8}$/;
    return regex.test(tel.replace(/\s/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!prenom.trim()) {
      setMessage({ type: 'error', text: 'Le pseudo est obligatoire' });
      return;
    }

    if (!telephone.trim()) {
      setMessage({ type: 'error', text: 'Le numéro de téléphone est obligatoire' });
      return;
    }

    if (!validerTelephone(telephone)) {
      setMessage({ type: 'error', text: 'Format de téléphone invalide (ex: 6XXXXXXXX)' });
      return;
    }

    setLoading(true);

    try {
      // 🔹 Remplacer l'URL par celle de ton backend Django
      const response = await fetch('http://localhost:8000/api/inscriptions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom: prenom.trim(), telephone: telephone.trim(), operateur })
      });

      if (!response.ok) {
        // Si le backend renvoie un message d'erreur spécifique
        const data = await response.json();
        if (data.detail) {
          throw new Error(data.detail);
        } else {
          throw new Error('Erreur lors de l\'inscription');
        }
      }

      setMessage({ type: 'success', text: '🎉 Inscription réussie ! Bonne chance !' });
      setPrenom('');
      setTelephone('');
      setOperateur('Orange Money');

      if (onInscriptionReussie) {
        onInscriptionReussie();
      }
    } catch (error) {
      if (error.message.includes('déjà inscrit')) {
        setMessage({ type: 'error', text: 'Ce numéro est déjà inscrit au concours' });
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de l\'inscription. Réessayez.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = concoursTermine || placesRestantes <= 0 || loading;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="inscription-form">
        <div className="form-group">
          <label htmlFor="prenom">Pseudo *</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Votre pseudo"
            disabled={isDisabled}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telephone">Numéro de téléphone *</label>
          <input
            type="tel"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="6XXXXXXXX"
            disabled={isDisabled}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="operateur">Opérateur *</label>
          <select
            id="operateur"
            value={operateur}
            onChange={(e) => setOperateur(e.target.value)}
            disabled={isDisabled}
            required
          >
            <option value="Orange Money">Orange Money</option>
            <option value="MTN Money">MTN Money</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={isDisabled}>
          {loading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>

        {concoursTermine && <p className="message error">Le concours est terminé</p>}
        {!concoursTermine && placesRestantes <= 0 && <p className="message error">Toutes les places sont prises</p>}
        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
      </form>
    </div>
  );
}

export default FormInscription;
