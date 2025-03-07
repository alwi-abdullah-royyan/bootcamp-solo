import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function getCart(token) {
  try {
    const response = await axios.get(`${api}/cart/id`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch cart");
    return err;
  }
}

export async function manageCart(qty, productId, token) {
  try {
    const response = await axios.post(
      `${api}/cart/manage`,
      { qty, productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Failed to update cart");
    return err;
  }
}

export async function checkCart(id, checked, token) {
  try {
    const response = await axios.get(
      `${api}/cart/check/${id}`,
      { checked },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Failed to check cart");
    return err;
  }
}

export async function deleteCart(id, token) {
  try {
    const response = await axios.delete(`${api}/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to delete cart");
    return err;
  }
}
