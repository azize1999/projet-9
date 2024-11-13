import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Changement : renommé byDateDesc en sortedEvents pour plus de clarté
  const sortedEvents = data?.focus?.sort((eventA, eventB) =>
    new Date(eventB.date) > new Date(eventA.date) ? -1 : 1
  ) || []; // Changement : tableau vide par défaut pour éviter les erreurs de longueur undefined

  // Changement : mise à jour de goToNextCard pour permettre la navigation directe vers un index donné
  const goToNextCard = (newIndex = null) => {
    if (newIndex !== null) {
      setIndex(newIndex);
    } else {
      setIndex((prevIndex) =>
        prevIndex < sortedEvents.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  useEffect(() => {
    // Changement : utilisation de setInterval au lieu de setTimeout pour un intervalle constant
    const interval = setInterval(goToNextCard, 5000);

    // Nettoyage de l'intervalle pour éviter les fuites de mémoire
    return () => clearInterval(interval);
  }, [index, sortedEvents]);

  // Fonction de gestion pour la pagination
  const handleRadioChange = (newIndex) => {
    goToNextCard(newIndex);
  };

  return (
    <div className="SlideCardList">
      {sortedEvents.map((event, idx) => (
        <div
          key={event.id || `event-${idx}`}  // Changement : utilisation de id ou idx pour des clés uniques
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedEvents.map((event, radioIdx) => (
            <input
              key={event.id || `pagination-${radioIdx}`} // Changement : identifiant unique avec id ou index
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)} // Changement : ajout de onChange pour suivre l'état de checked
              aria-label={`Go to slide ${radioIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;