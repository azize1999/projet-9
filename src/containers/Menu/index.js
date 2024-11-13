/* eslint-disable no-return-assign */

import Button from "../../components/Button"; // Importe le composant "Button" depuis le dossier des composants.
import Logo from "../../components/Logo";     // Importe le composant "Logo" depuis le dossier des composants.

import "./style.scss"; // Importe le fichier de styles SCSS pour appliquer les styles au composant.

const Menu = () => {
  // Déclare le composant fonctionnel "Menu".

  const handleSmoothScroll = (e, target) => {
    // Fonction pour gérer le défilement fluide vers une cible spécifique.
    e.preventDefault(); // Empêche le comportement par défaut du lien (qui serait de changer l'URL).
    document.querySelector(target).scrollIntoView({
      // Sélectionne l'élément correspondant à la cible et effectue un défilement fluide.
      behavior: "smooth", // Spécifie que le défilement doit être lisse.
    });
  };

  return (
    // Retourne le JSX qui définit l'apparence du menu.
    <nav>
      {/* Composant Logo affiché dans la barre de navigation */}
      <Logo />
      <ul>
        {/* Liste des liens du menu */}
        <li>
          <a href="#nos-services" onClick={(e) => handleSmoothScroll(e, "#services")}>
            {/* Lien vers la section "Nos services" avec un défilement fluide */}
            Nos services
          </a>
        </li>
        <li>
          <a href="#nos-realisations" onClick={(e) => handleSmoothScroll(e, "#events")}>
            {/* Lien vers la section "Nos réalisations" avec un défilement fluide */}
            Nos réalisations
          </a>
        </li>
        <li>
          <a href="#notre-equipe" onClick={(e) => handleSmoothScroll(e, "#team")}>
            {/* Lien vers la section "Notre équipe" avec un défilement fluide */}
            Notre équipe
          </a>
        </li>
      </ul>
      <Button title="contact" onClick={(e) => handleSmoothScroll(e, "#contact")}>
        {/* Bouton pour aller à la section "Contact" avec un défilement fluide */}
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
// Exporte le composant "Menu" pour qu'il puisse être utilisé ailleurs dans l'application.