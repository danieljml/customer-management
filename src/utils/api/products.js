const url_api = 'https://dummyjson.com/products/category';

export const getProducts = async (category) => {
  try {
    const data = await fetch(`${url_api}/${category}/?limit=5`);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
