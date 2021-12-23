import axios from "axios";

export const fetchGetCategory = async (
  num = 1,
  category1,
  category2,
  category3
) => {
  const { data } = await axios.post("api/product?type=category", {
    num,
    category1,
    category2,
    category3,
  });

  return data;
};
