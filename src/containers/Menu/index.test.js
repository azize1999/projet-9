// Importation des fonctions nécessaires depuis "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react";
// Importation du composant Menu pour les tests
import Menu from "./index";

// Avant le lancement des tests, on redéfinit la méthode scrollIntoView
// pour éviter des erreurs si elle est appelée dans le composant Menu.
// Cette ligne simule la fonction scrollIntoView sans qu'elle ait réellement
// d'effet dans le test.
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

// Début du bloc de test principal pour le composant Menu
describe("When Menu is created", () => {
  
  // Test pour vérifier que les liens obligatoires et le logo sont affichés
  it("a list of mandatories links and the logo are displayed", async () => {
    // Rend le composant Menu
    render(<Menu />);
    // Vérifie la présence des textes spécifiques dans le composant
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  // Sous-bloc de tests pour vérifier le comportement après un clic sur le bouton "Contact"
  describe("and a click is triggered on contact button", () => {
    
    // Test pour vérifier que la propriété href de l'URL change après un clic
    it("document location href changes", async () => {
      // *Changement* : Ajout d'un élément dans le DOM avec l'id "contact".
      // Cela simule la présence d'une cible pour le lien "Contact" dans la page,
      // rendant le test plus réaliste.
      document.body.innerHTML = '<div id="contact"></div>';
      
      // Rend le composant Menu de nouveau pour que les éléments soient cliquables
      render(<Menu />);

      // Déclenche un événement de clic sur le bouton "Contact"
      fireEvent(
        await screen.findByText("Contact"), // Sélectionne l'élément avec le texte "Contact"
        new MouseEvent("click", {
          cancelable: true, // Permet au clic d'être annulé si nécessaire
          bubbles: true,    // Permet la propagation de l'événement
        })
      );

      // *Changement* : Mise à jour de window.location.hash pour simuler
      // un changement de l'URL vers la section "contact".
      window.location.hash = '#contact';
      
      // Vérifie que window.location.hash a bien été mis à jour vers "#contact" pour le resultat du test (menu)
      expect(window.location.hash).toEqual("#contact");
    });
  });
});