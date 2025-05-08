import React, { useState, useEffect } from "react";
import "../styles/components/charactermodal.css";

const CharacterModal = ({ character, onClose }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [originInfo, setOriginInfo] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      if (character.location && character.location.url) {
        try {
          const response = await fetch(character.location.url);
          const data = await response.json();
          setLocationInfo(data);
        } catch (error) {
          console.error("Erro ao buscar localização:", error);
        }
      }
    };

    const fetchOriginData = async () => {
      if (character.origin && character.origin.url) {
        try {
          const response = await fetch(character.origin.url);
          const data = await response.json();
          setOriginInfo(data);
        } catch (error) {
          console.error("Erro ao buscar origem:", error);
        }
      }
    };

    fetchLocationData();
    fetchOriginData();
  }, [character]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{character.name}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="character-main">
            <div className="character-image">
              <img src={character.image} alt={character.name} />
            </div>
            <div className="character-info">
              <p>
                <strong>Status:</strong> {character.status}
              </p>
              <p>
                <strong>Espécie:</strong> {character.species}
              </p>
              <p>
                <strong>Gênero:</strong> {character.gender}
              </p>
            </div>
          </div>

          <div className="character-extra">
            <div className="location-details">
              <h3>Última localização conhecida:</h3>
              <p>{character.location.name}</p>
              {locationInfo && (
                <>
                  <p>Tipo: {locationInfo.type}</p>
                  <p>Dimensão: {locationInfo.dimension}</p>
                  <p>Residentes: {locationInfo.residents.length}</p>
                </>
              )}
            </div>

            <div className="origin-details">
              <h3>Origem:</h3>
              <p>{character.origin.name}</p>
              {originInfo && (
                <>
                  <p>Tipo: {originInfo.type}</p>
                  <p>Dimensão: {originInfo.dimension}</p>
                  <p>Residentes: {originInfo.residents.length}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
