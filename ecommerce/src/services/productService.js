import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function getProductDetail(id) {
  try {
    const response = await axios.get(`${api}/product/${id}`);
    return response;
  } catch (err) {
    console.log("Failed to fetch product detail");
    return err;
  }
}

export function getImageProduct(id) {
  return `${api}/product/image/${id}`;
}
export async function getAllProduct(page = 0, size = 10) {
  try {
    const response = await axios.get(`${api}/product/all?page=${page}&size=${size}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch product");
    return err;
  }
}

export async function getProductWithFilter(page = 0, size = 10, category, minPrice, maxPrice, name) {
  try {
    const params = {
      page,
      size,
      ...(category && { category }),
      ...(minPrice !== undefined && { minPrice }),
      ...(maxPrice !== undefined && { maxPrice }),
      ...(name && { name }),
    };

    const queryString = new URLSearchParams(params).toString();

    const response = await axios.get(`${api}/product/filter?${queryString}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch products with filter");
    return err;
  }
}

export async function updateProduct(id, formData, token) {
  try {
    const response = await axios.put(`${api}/product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.log("Failed to update product");
    return err;
  }
}

export async function createProduct(formData, token) {
  try {
    const response = await axios.post(`${api}/product/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (err) {
    console.log("Failed to create product", err);
    return err;
  }
}

export async function deleteProduct(id, token) {
  try {
    const response = await axios.delete(`${api}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log("Failed to delete product");
    return err;
  }
}
