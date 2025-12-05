import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// --- JUEGOS ---
export const getAllGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
  } catch (error) {
    console.error("Error cargando juegos:", error);
    return [];
  }
};

// Cambiamos el nombre para que tenga sentido, aunque la URL es la misma estructura
export const getGameById = async (id) => {
  try {
    // Ahora enviamos el ID numérico
    const response = await axios.get(`${API_URL}/games/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error buscando juego por ID:", error);
    return null;
  }
};
export const syncGames = async () => {
  try {
    const response = await axios.post(`${API_URL}/games/sync`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- WISHLIST ---
export const getWishlist = async () => {
  try {
    const response = await axios.get(`${API_URL}/wishlist`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const addToWishlist = async (gameId, note = "") => {
  try {
    const response = await axios.post(`${API_URL}/wishlist/add`, { gameId, note });
    return response.data;
  } catch (error) {
    // Retornamos el mensaje de error del backend (ej: "Ya existe")
    throw error.response?.data || "Error al guardar";
  }
};

export const deleteFromWishlist = async (id) => {
  await axios.delete(`${API_URL}/wishlist/${id}`);
};

export const updateWishlistNote = async (id, note) => {
  await axios.put(`${API_URL}/wishlist/${id}`, { note });
};