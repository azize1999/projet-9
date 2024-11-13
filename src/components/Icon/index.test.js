// Importation des utilitaires de test nécessaires pour afficher le composant (render) et interroger le DOM (screen)
import { render, screen } from "@testing-library/react";
// Importation de la bibliothèque md5 pour générer des valeurs de hachage
import md5 from "md5";
// Importation du composant Icon à tester
import Icon from ".";

// Début du bloc de tests pour le composant Icon
describe("Icon component", () => {

    // Sous-bloc de tests pour vérifier le rendu de l'icône avec le nom "twitch"
    describe("When an icon is created with name twitch", () => {
        
        // Test pour vérifier que l'icône "twitch" contient le chemin correspondant à une valeur de hachage spécifique
        it("the icon contains this path hash value 327fbc38c8e878259c3ec35ef231517a", () => {
            
            // Affichage du composant Icon avec la prop name="twitch"
            render(<Icon name="twitch" />);
            
            // Vérification de la valeur de hachage du chemin de l'icône :
            // - screen.getByTestId("icon") récupère l'élément avec data-testid="icon" (l'icône SVG)
            // - .getAttribute('d') obtient la valeur de l'attribut d du SVG, qui définit le chemin de l'icône
            // - md5(...) calcule le hachage md5 de cette valeur pour le comparer à la valeur attendue
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toEqual('327fbc38c8e878259c3ec35ef231517a');
        });
    });

    // Sous-bloc de tests pour vérifier le rendu de l'icône avec le nom "facebook"
    describe("When an icon is created with name facebook", () => {
        
        // Test pour vérifier que l'icône "facebook" contient le chemin correspondant à une valeur de hachage spécifique
        it("the icon contains this path hash value bbea4c9e40773b969fdb6e406059f853", () => {
            
            // Affichage du composant Icon avec la prop name="facebook"
            render(<Icon name="facebook" />);
            
            // Vérification de la valeur de hachage du chemin de l'icône :
            // - screen.getByTestId("icon") récupère l'élément avec data-testid="icon" (l'icône SVG)
            // - .getAttribute('d') obtient la valeur de l'attribut d du SVG, qui définit le chemin de l'icône
            // - md5(...) calcule le hachage md5 de cette valeur pour le comparer à la valeur attendue
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toEqual('bbea4c9e40773b969fdb6e406059f853');
        });
    });
});