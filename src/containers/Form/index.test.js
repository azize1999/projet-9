// Importation des utilitaires nécessaires pour les tests, notamment pour simuler des événements (fireEvent), 
// effectuer un rendu (render), et interroger le DOM (screen)
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index"; // Importation du composant Form à tester

// Début du bloc de test principal pour le composant Form
describe("When Events is created", () => {
  // Test pour vérifier que les champs de formulaire sont affichés
  it("a list of event fields is displayed", async () => {
    // Rendu du composant Form
    render(<Form />);

    // Vérification de la présence des différents champs du formulaire
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("Nom")).toBeInTheDocument();
    expect(await screen.findByText("Prénom")).toBeInTheDocument();
    expect(await screen.findByText("Personel / Entreprise")).toBeInTheDocument();
    // Changement : Ajout de expect(...).toBeInTheDocument() pour rendre les assertions explicites et renforcer la lisibilité
  });

  // Sous-bloc de test pour l'action de clic sur le bouton de soumission
  describe("and a click is triggered on the submit button", () => {
    // Test pour vérifier que l'action de succès est appelée après un clic sur le bouton de soumission
    it("the success action is called", async () => {
      // Création d'une fonction mock onSuccess pour simuler l'action de succès
      const onSuccess = jest.fn(); 

      // Rendu du composant Form avec la fonction onSuccess passée en prop
      render(<Form onSuccess={onSuccess} />);

      // Récupération du bouton de soumission en utilisant son data-testid
      const submitButton = screen.getByTestId("button-test-id");
      // Changement : Récupération du bouton de soumission avant le clic, pour une meilleure lisibilité et réutilisabilité

      // Simulation d'un clic sur le bouton de soumission
      fireEvent.click(submitButton);
      // Changement : Simplification du clic avec fireEvent.click(submitButton) au lieu de fireEvent(..., new MouseEvent("click", ...))

      // Vérification que le texte "En cours" s'affiche, indiquant que le formulaire est en cours de soumission
      await screen.findByText("En cours");

      // Vérification que le texte "Envoyer" est toujours présent, indiquant que le bouton de soumission est toujours visible
      await screen.findByText("Envoyer");

      // Vérification que la fonction onSuccess a été appelée, signifiant que la soumission a réussi
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});