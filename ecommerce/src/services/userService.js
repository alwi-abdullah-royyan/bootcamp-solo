import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function register(username, email, password, confirmPassword) {
  try {
    const response = await axios.post(`${api}/user/register`, {
      username,
      email,
      password,
      confirmPassword,
    });
    return response;
  } catch (err) {
    console.log("Register failed : ", err);
    return { status: false, error: err };
  }
}

export async function getAllUser(page = 0, size = 10, token) {
  try {
    const response = await axios.get(`${api}/user/all?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch user");
    return err;
  }
}

export async function getUserById(id, token) {
  try {
    const response = await axios.get(`${api}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch user");
    return err;
  }
}

export async function updateUser(id, { username, email, role, password, confirmPassword }, token) {
  try {
    const payload = {};

    if (username) payload.username = username;
    if (email) payload.email = email;
    if (role) payload.role = role;
    if (password) payload.password = password;
    if (confirmPassword) payload.confirmPassword = confirmPassword;

    const response = await axios.put(`${api}/user/update/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log("Failed to update user");
    return err;
  }
}

export async function deleteUser(id, token) {
  try {
    const response = await axios.delete(`${api}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to delete user");
    return err;
  }
}
