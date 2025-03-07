import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icons from "@/components/atoms/Icons";
import { getCurrentUser, getToken, isAdminUser, isAuthenticated, logout } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "@/redux/authSlice/authSlice";
import HeaderItemLg from "@/components/molecules/HeaderItemLg";
import HeaderItemSm from "@/components/molecules/HeaderItmSm";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { authStatus, username, isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = {
        authStatus: isAuthenticated(),
        username: isAuthenticated() ? getCurrentUser() : null,
        isAdmin: isAuthenticated() ? isAdminUser() : false,
      };
      dispatch(setAuthState(userData));
    }
  }, [dispatch]);

  return (
    <header className="bg-gray-900 text-gray-200 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <HeaderItemLg authStatus={authStatus} username={username} isAdmin={isAdmin} />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-200 hover:text-blue-500 focus:outline-none"
        >
          <Icons.Hamburger />
        </button>
      </div>
      <HeaderItemSm isOpen={isOpen} authStatus={authStatus} username={username} isAdmin={isAdmin} />
    </header>
  );
};

export default Header;
