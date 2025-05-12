import "../styles/components/charactermodal.css";

const CharacterModal = ({ character, onClose }) => {
  const locationInfo = character.locationDetails;
  const originInfo = character.originDetails;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{character.name}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="character-main">
            <div className="character-image">
              <img src={character.image} alt={character.name} />
            </div>
            <div className="character-info">
              <p><strong>Status:</strong> {character.status}</p>
              <p><strong>Espécie:</strong> {character.species}</p>
              {character.type && (
                <p><strong>Tipo:</strong> {character.type}</p>
              )}
              <p><strong>Gênero:</strong> {character.gender}</p>
              <p><strong>Episódios:</strong> {character.episode.length}</p>
              {character.lastEpisodeName && (
                <p><strong>Última aparição:</strong> {character.lastEpisodeName}</p>
              )}
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
