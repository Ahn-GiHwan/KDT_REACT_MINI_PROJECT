import axios from "axios";

export const getSuggestionQuery = async (query) => {
  const { data } = await axios.post("api/naverApi?type=search", {
    query,
  });

  return data;
};

export const getProductByQuery = async (query) => {
  const { data } = await axios.post("api/naverApi?type=shopList", {
    query,
  });

  return data;
};
