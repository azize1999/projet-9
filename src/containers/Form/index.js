import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Fonction simulant un appel API, avec un délai de 500ms
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false); // État pour gérer l'envoi du formulaire

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true); // Indique que l'envoi est en cours

      try {
        await mockContactApi(); // Appel simulé à l'API

        setSending(false); // Réinitialise l'état d'envoi
        onSuccess(); // Changement : Appelle onSuccess() après un envoi réussi pour indiquer le succès

      } catch (err) {
        setSending(false); // Réinitialise l'état d'envoi en cas d'erreur
        onError(err); // Appelle onError pour gérer l'erreur
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          {/* Champ pour le nom */}
          <Field placeholder="" label="Nom" />

          {/* Champ pour le prénom */}
          <Field placeholder="" label="Prénom" />

          {/* Sélecteur pour le type de contact */}
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />

          {/* Champ pour l'email */}
          <Field placeholder="" label="Email" />

          {/* Bouton d'envoi du formulaire */}
          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={sending} // Désactive le bouton si en cours d'envoi
            data-testid="button-test-id" // Changement : Ajout de data-testid pour faciliter le test
          >
            {sending ? "En cours" : "Envoyer"} {/* Affiche "En cours" pendant l'envoi */}
          </Button>
        </div>

        <div className="col">
          {/* Champ de texte pour le message */}
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func, // Fonction appelée en cas d'erreur d'envoi
  onSuccess: PropTypes.func, // Fonction appelée en cas de succès d'envoi
}

Form.defaultProps = {
  onError: () => null, // Définit un comportement par défaut pour onError
  onSuccess: () => null, // Définit un comportement par défaut pour onSuccess
}

export default Form;
