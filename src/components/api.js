import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCharacters = async (page = 1, name = '') => {
  try {
    const response = await api.get('/character', {
      params: { page, name },
    });

    const characters = response.data.results;

    const charactersWithEpisodes = await Promise.all(
      characters.map(async (character) => {
        const episodeUrls = character.episode;
        const lastEpisodeUrl = episodeUrls[episodeUrls.length - 1];

        try {
          const episodePath = new URL(lastEpisodeUrl).pathname; 
          const episodeResponse = await api.get(episodePath);

          return {
            ...character,
            lastEpisodeName: episodeResponse.data.name,
          };
        } catch (error) {
          console.error(`Erro ao buscar episódio de ${character.name}:`, error);
          return {
            ...character,
            lastEpisodeName: 'Desconhecido',
          };
        }
      })
    );

    return {
      ...response.data,
      results: charactersWithEpisodes,
    };
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};

export const fetchCharacter = async (id) => {
  try {
    const response = await api.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    throw error;
  }
};

export const fetchStats = async () => {
  try {
    const [locations, episodes] = await Promise.all([
      api.get('/location'),
      api.get('/episode'),
    ]);

    return {
      locationsCount: locations.data.info.count,
      episodesCount: episodes.data.info.count,
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }
};
