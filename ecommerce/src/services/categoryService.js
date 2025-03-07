import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function getAllCategory() {
  try {
    const response = await axios.get(`${api}/category/all`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch category");
    return err;
  }
}

export async function getCategoryById(id) {
  try {
    const response = await axios.get(`${api}/category/${id}`);
    return response.data.data;
  } catch (err) {
    console.log("Failed to fetch category");
    return err;
  }
}

export async function createCategory(name, token) {
  try {
    const response = await axios.post(
      `${api}/category`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log("Failed to create category");
    return err;
  }
}

export async function updateCategory(id, name, token) {
  try {
    const response = await axios.put(
      `${api}/category/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log("Failed to update category");
    return err;
  }
}

export async function deleteCategory(id, token) {
  try {
    const response = await axios.delete(`${api}/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (err) {
    console.log("Failed to delete category");
    return err;
  }
}
