import axios from "axios";

export const getProductCount = async () => {
  const { data } = await axios.post("api/product?type=page", {
    user_id: "agh@test.com",
  });

  return data;
};

export const getProductList = async (
  category1,
  category2,
  category3,
  category4
) => {
  const { data } = await axios.post("api/product?type=list", {
    user_id: "agh@test.com",
    title: null,
    category1: category1 && category1,
    category2: category2 ? category2 : undefined,
    category3: category3 ? category3 : undefined,
    category4: category4 ? category4 : undefined,
  });
  return data;
};

export const fetchInsertProduct = async (product) => {
  const { hprice, lprice, productId, productType, mallName } = product;
  const { data } = await axios.post("api/naverApi?type=save", {
    ...product,
    h_price: hprice,
    l_price: lprice,
    product_id: productId,
    product_type: productType,
    mall_name: mallName,
    product_count: 1,
  });
  return data;
};
