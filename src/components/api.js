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

    const charactersWithDetails = await Promise.all(
      characters.map(async (character) => {
        const [originInfo, locationInfo, lastEpisodeInfo] = await Promise.all([
          character.origin?.url ? api.get(character.origin.url) : null,
          character.location?.url ? api.get(character.location.url) : null,
          character.episode.length > 0
            ? api.get(character.episode[character.episode.length - 1])
            : null,
        ]);

        return {
          ...character,
          originDetails: originInfo ? originInfo.data : null,
          locationDetails: locationInfo ? locationInfo.data : null,
          lastEpisodeName: lastEpisodeInfo ? lastEpisodeInfo.data.name : 'Desconhecido',
        };
      })
    );

    return {
      ...response.data,
      results: charactersWithDetails,
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
