import axios from "axios";
import { jwtDecode } from "jwt-decode";
const api = process.env.NEXT_PUBLIC_API;
export async function login(username, password) {
  try {
    const response = await axios.post(`${api}/auth/login`, { username, password });

    return response;
  } catch (err) {
    console.log("Login failed : ", err);
    return { status: false, error: err };
  }
}

export async function me(token) {
  try {
    const response = await axios.get(`${api}/auth/me`, {
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

export async function refreshToken(token) {
  try {
    const response = await axios.get(`${api}/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log("Failed to refresh token");
    return err;
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function getCurrentUser() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.sub || null;
  } catch (err) {
    console.log("Invalid token:", err);
    return null;
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // Check if Token is Expired
    if (decoded.exp * 1000 < Date.now()) {
      logout(); // Remove token if expired
      return false;
    }
    return true;
  } catch (err) {
    console.log("Authentication check failed:", err);
    return false;
  }
}
export function isAdminUser() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    return decoded.role === "ADMIN"; // Check if isAdmin is true
  } catch (err) {
    console.log("Admin check failed:", err);
    return false;
  }
}

// Handle Logout
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
