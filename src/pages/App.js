import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import { fetchCharacters, fetchStats } from "../components/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/base/globals.css";
import "../styles/layout/main.css";
import "../styles/layout/pagination.css";

const CARDS_PER_PAGE = 12;
const LEFT_COLUMN_COUNT = 8;
const RIGHT_COLUMN_COUNT = 4;

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [info, setInfo] = useState({});
  const [carouselPage, setCarouselPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await fetchStats();
        setLocations(stats.locationsCount);
        setEpisodes(stats.episodesCount);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    };
    loadStats();
  }, []);

  useEffect(() => {
    setCarouselPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters(carouselPage, searchTerm);
        setCharacters(data.results || []);

        const customInfo = {
          ...data.info,
          pages: Math.ceil(data.info.count / CARDS_PER_PAGE),
          count: data.info.count
        };
        setInfo(customInfo);
      } catch (error) {
        console.error("Erro ao carregar personagens:", error);
        setCharacters([]);
        setInfo({});
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, [carouselPage, searchTerm]);

  const leftColumn = characters.slice(0, LEFT_COLUMN_COUNT);
  const rightColumn = characters.slice(LEFT_COLUMN_COUNT, LEFT_COLUMN_COUNT + RIGHT_COLUMN_COUNT);

  return (
    <div className="app-bg">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="loading-container">
          <div className="portal-loader"></div>
          <p>Carregando personagens...</p>
        </div>
      ) : characters.length === 0 ? (
        <div className="no-results-container">
          <p>Nenhum personagem encontrado. Tente outra busca.</p>
        </div>
      ) : (
        <>
          <div className="carousel-controls">
            <button
              className="btn btn-secondary carousel-arrow left"
              onClick={() => setCarouselPage((p) => Math.max(1, p - 1))}
              disabled={carouselPage === 1}
            >
              &#8592;
            </button>

            <div className="cards-grid-custom carousel-slide">
              <div className="cards-col left-col">
                {leftColumn.map((char) => (
                  <CharacterCard
                    key={char.id}
                    character={char}
                    onClick={() => setSelectedCharacter(char)}
                  />
                ))}
              </div>
              <div className="cards-col right-col">
                {rightColumn.map((char) => (
                  <CharacterCard
                    key={char.id}
                    character={char}
                    onClick={() => setSelectedCharacter(char)}
                  />
                ))}
              </div>
            </div>

            <button
              className="btn btn-secondary carousel-arrow right"
              onClick={() => setCarouselPage((p) => p + 1)}
              disabled={carouselPage >= (info.pages || 1)}
            >
              &#8594;
            </button>
          </div>

          <div className="pagination-info">
            <p>Página {carouselPage} de {info.pages || 1}</p>
          </div>
        </>
      )}

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}

      <footer className="footer">
        <div className="footer-stats">
          <span>PERSONAGENS: <strong>{info.count || "XX"}</strong></span>
          <span>LOCALIZAÇÕES: <strong>{locations ?? "XX"}</strong></span>
          <span>EPISÓDIOS: <strong>{episodes ?? "XX"}</strong></span>
        </div>
        <div className="footer-credits">
          <span>Desenvolvido por <strong>Nome do Growdever</strong> em {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;