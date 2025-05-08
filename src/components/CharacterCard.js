import React from 'react';
import '../styles/components/charactercard.css';

export default function CharacterCard({ character, onClick }) {
  const statusColors = {
    Alive: 'var(--color-alive)',
    Dead: 'var(--color-dead)',
    unknown: 'var(--color-unknown)',
  };

  const statusMap = {
    Alive: 'Vivo',
    Dead: 'Morto',
    unknown: 'Desconhecido',
  };

  return (
    <div className="character-card" onClick={() => onClick(character)}>
      <div className="image-wrapper">
        <img src={character.image} alt={character.name} className="character-image" />
      </div>
      <div className="character-content">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-status">
          <span
            className="status-dot"
            style={{ backgroundColor: statusColors[character.status] }}
          ></span>
          {statusMap[character.status] || 'Desconhecido'} - {character.species}
        </p>
        <p className="character-location-label">Última localização conhecida</p>
        <p className="character-location-value">{character.location.name}</p>
        <p className="character-episode-label">Visto a última vez em:</p>
        <p className="character-episode-value">
          {character.lastEpisodeName || 'Desconhecido'}
        </p>
      </div>
    </div>
  );
}
