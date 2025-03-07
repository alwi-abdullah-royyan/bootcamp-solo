import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function getAllOrder(token, page = 0, size = 10) {
  try {
    const response = await axios.get(`${api}/order/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, size },
    });
    return response;
  } catch (err) {
    console.log("Failed to fetch orders", err);
    return err;
  }
}

export async function getOrderByStatus(token, status, page = 0, size = 10) {
  try {
    const response = await axios.get(`${api}/order/filter`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { status, page, size },
    });
    return response;
  } catch (err) {
    console.log("Failed to fetch orders", err);
    return err;
  }
}

export async function getOrderById(id, token) {
  try {
    const response = await axios.get(`${api}/order/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to fetch order");
    return err;
  }
}

export async function getOrderByUser(token, page = 0, size = 10) {
  try {
    const response = await axios.get(`${api}/order/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, size },
    });
    return response;
  } catch (err) {
    console.log("Failed to fetch orders", err);
    return err;
  }
}

export async function getOrderByUserAndStatus(token, status, page = 0, size = 10) {
  try {
    const response = await axios.get(`${api}/order/user/filter`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { status, page, size },
    });
    return response;
  } catch (err) {
    console.log("Failed to fetch orders by status", err);
    return err;
  }
}

export async function createOrder(token) {
  try {
    const response = await axios.get(`${api}/order/create`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log("Failed to create order");
    return err;
  }
}

export async function getOrderStatusCanChangedTo(id, token) {
  try {
    const response = await axios.get(`${api}/order/status_can_change_to/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to fetch order");
    return err;
  }
}

export async function changeOrderStatus(id, status, token) {
  try {
    const response = await axios.put(
      `${api}/order/update/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return response;
  } catch (err) {
    console.log("Failed to change order status");
    return err;
  }
}

export async function deleteOrder(id, token) {
  try {
    const response = await axios.delete(`${api}/order/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to delete order");
    return err;
  }
}
