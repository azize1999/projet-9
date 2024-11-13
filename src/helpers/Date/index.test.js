// Importation de la fonction getMonth depuis le fichier ./index
// Changement : ajout de l'importation pour accéder à getMonth et pouvoir tester son comportement
import { getMonth } from './index'; 

// Début du bloc de test principal pour le module "Date helper"
describe("Date helper", () => {
  
    // Sous-bloc de test pour le cas où la fonction getMonth est appelée
    describe("When getMonth is called", () => {
      
      // Test pour vérifier que la fonction retourne "janvier" lorsqu'on lui passe la date "2022-01-01"
      it("the function return janvier for 2022-01-01 as date", () => {
        // Appel de la fonction getMonth avec une date spécifique (1er janvier 2022)
        const result = getMonth(new Date("2022-01-01"));
        
        // Assertion pour vérifier que le résultat est "janvier"
        expect(result).toBe("janvier");
      });
  
      // Test pour vérifier que la fonction retourne "juillet" lorsqu'on lui passe la date "2022-07-08"
      it("the function return juillet for 2022-07-08 as date", () => {
        // Appel de la fonction getMonth avec une autre date spécifique (8 juillet 2022)
        const result = getMonth(new Date("2022-07-08"));
        
        // Assertion pour vérifier que le résultat est "juillet"
        expect(result).toBe("juillet");
      });
    });
});