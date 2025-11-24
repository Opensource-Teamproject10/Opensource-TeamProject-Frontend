import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

export const getRestaurants = async (region) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants?region=${region}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};