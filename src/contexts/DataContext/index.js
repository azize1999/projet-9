import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo, // Changement : ajout de useMemo pour optimiser la valeur de contexte
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Changement : ajout de l'état loading pour gérer le statut de chargement

  // Définition de la fonction pour charger les données
  const getData = useCallback(async () => {
    try {
      const result = await api.loadData();
      setData(result); // Affecte les données chargées à l'état data
    } catch (err) {
      setError(err); // Afficher une erreur de chargement
    } finally {
      setLoading(false); // Changement : mise à jour de loading pour indiquer la fin du chargement, qu'il y ait une erreur ou non
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData(); // Charge les données si elles ne sont pas déjà chargées
    }
  }, [getData, data]); // Utilise getData et data comme dépendances

  // Utilisation de useMemo pour optimiser le contexte en évitant les recréations de l'objet value
  const value = useMemo(() => ({
    data,
    error,
    loading, // Changement : ajout de loading dans l'objet de contexte pour le rendre accessible aux composants enfants
  }), [data, error, loading]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
