import Icons from "@/components/atoms/Icons";
import { logout } from "@/services/authService";
import Link from "next/link";
import React from "react";

const HeaderItemSm = ({ isOpen, authStatus, username, isAdmin }) => {
  return (
    <>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            {isAdmin && (
              <Link href="/admin/dashboard" className="hover:text-blue-500 transition-colors">
                Dashboard
              </Link>
            )}
            <Link href="/cart" className="hover:text-blue-500 transition-colors">
              Cart
            </Link>
            <Link href="/order" className="hover:text-blue-500 transition-colors">
              Order
            </Link>

            {authStatus ? (
              <>
                <Link href={`/profile`} className="flex hover:text-blue-500 transition-colors">
                  <Icons.Profile /> Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex hover:bg-red-600 transition-colors text-red px-4 py-2 rounded-md"
                >
                  <Icons.Logout /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="flex hover:text-blue-500 transition-colors">
                <div className="flex">
                  <Icons.Login /> Login
                </div>
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default HeaderItemSm;
