import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// Nombre d'événements affichés par page
const PER_PAGE = 9;

const EventList = () => {
  // Accès aux données et aux erreurs depuis le contexte
  const { data, error } = useData();
  // État pour stocker le type sélectionné (par défaut: null, donc tous les types)
  const [type, setType] = useState(null); // Changement : Initialisation explicite à null
  // État pour stocker la page actuelle
  const [currentPage, setCurrentPage] = useState(1);
  // État pour stocker les événements filtrés selon le type et la page
  const [filteredEvents, setfilteredEvents] = useState([]); // Changement : ajout de filteredEvents pour stocker les événements actuels
  // État pour stocker le nombre total de pages
  const [pageNumber, setPageNumber] = useState(0); // Changement : ajout de pageNumber pour calculer le nombre de pages

  // Utilisation de useEffect pour filtrer les événements et calculer la pagination
  useEffect(() => {
    // Filtre les événements selon le type sélectionné (ou tous si aucun type n'est sélectionné)
    const filteredEventsAll = (data?.events || []).filter((event) => !type || event.type === type);

    // Extrait uniquement les événements de la page actuelle
    const paginatedEvents = filteredEventsAll.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    // Met à jour les événements affichés en fonction de la page actuelle
    setfilteredEvents(paginatedEvents); // Changement : mise à jour des événements pour la page en cours

    // Calcule et met à jour le nombre total de pages
    setPageNumber(Math.ceil(filteredEventsAll.length / PER_PAGE)); // Changement : calcul du nombre total de pages
  }, [data, type, currentPage]); // Recalcul lorsque data, type ou currentPage changent

  // Fonction pour changer de type d'événement et revenir à la première page
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialise la page actuelle à 1
    setType(evtType); // Change le type d'événement sélectionné
  };

  // Génère une liste unique de types d'événements
  const typeList = new Set(data?.events.map((event) => event.type));
  
  return (
    <>
      {error && <div>An error occured</div>} {/* Affiche un message d'erreur si error est défini */}
      {data === null ? (
        "loading" // Affiche "loading" si les données sont en cours de chargement
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)} // Liste des types d'événements pour le composant Select
            onChange={(value) => (value ? changeType(value) : changeType(null))} // Filtre selon le type sélectionné
          />
          <div id="events" className="ListContainer">
            {/* Affiche les cartes d'événements filtrés */}
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)} // Ouvre le modal au clic
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {/* Génère un lien pour chaque page */}
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1} {/* Affiche le numéro de la page */}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;