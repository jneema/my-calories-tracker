import api from "./index";
import { USDA_API_KEY } from "@env";

// Search foods
export const searchFood = async (query) => {
  try {
    const response = await api.get(`/foods/search?api_key=${USDA_API_KEY}`, {
        params: {
          query: query,
          pageSize: 10,
        },
    });
    console.log("USDA Search Response:", response.data);
    return response.data.foods || [];
  } catch (error) {
    console.error("USDA API Error:", error);
    return [];
  }
};

// Get detailed info about a food
export const getFoodDetails = async (fdcId) => {
  try {
    const response = await api.get(`/food/${fdcId}`);
    return response.data;
  } catch (error) {
    console.error("USDA API Error:", error);
    return null;
  }
};
