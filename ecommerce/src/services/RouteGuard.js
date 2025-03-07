import { getCurrentUser, getToken, isAdminUser, isAuthenticated, refreshToken } from "./authService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const oldToken = getToken();
      if (!oldToken || tokenRefreshed) return; // Prevent infinite loop

      try {
        const response = await refreshToken(oldToken);
        if (response?.data?.token) {
          localStorage.setItem("token", response.data.token);
          setTokenRefreshed(true); // Mark token as refreshed to prevent loops
        }
      } catch (err) {
        console.log("Failed to refresh token, logging out...");
        router.replace("/login"); // Redirect to login if refresh fails
      }
    };

    checkAndRefreshToken();
  }, [tokenRefreshed]); // Dependency ensures it runs only once

  useEffect(() => {
    const isAuth = isAuthenticated();
    const isAdmin = isAdminUser();

    const publicPaths = ["/", "/login", "/register", "/product"];
    const userPaths = ["/profile", "/cart", "/profile/edit", "/order"];
    const adminPaths = [
      "/admin/dashboard",
      "/admin/category",
      "/admin/category/add",
      "/admin/category/edit",
      "/admin/orders",
      "/admin/product",
      "/admin/product/add",
      "/admin/product/details",
      "/admin/product/edit",
    ];

    const isPublic = publicPaths.includes(router.pathname) || router.pathname.startsWith("/product/");
    const isUserPage = userPaths.includes(router.pathname) || router.pathname.startsWith("/order/");
    const isAdminPage = adminPaths.includes(router.pathname) || router.pathname.startsWith("/admin/orders/");

    if (router.pathname === "/404") return;

    if (!isAuth && !isPublic) {
      router.replace("/login");
      return;
    }

    if (isUserPage && !isAuth) {
      router.replace("/product");
      return;
    }

    if (isAdminPage && !isAdmin) {
      router.replace("/403");
      return;
    }
  }, [router.pathname]); // React only when the route changes

  return <>{children}</>;
};

export default RouteGuard;
