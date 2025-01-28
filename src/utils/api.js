import axios from 'axios';

// URL del servidor
const API_URL = process.env.REACT_APP_BACKEND_URL + 'embeds';

// Función para obtener los embeds
export const getEmbeds = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los embeds:', error);
  }
};

// Función para agregar un embed
export const addEmbed = async (link) => {
  try {
    await axios.post(API_URL, { link });
  } catch (error) {
    console.error('Error al agregar el embed:', error);
  }
};

// Función para eliminar un embed
export const deleteEmbed = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar el embed:', error);
  }
};
