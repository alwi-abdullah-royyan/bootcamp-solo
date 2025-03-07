import { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (!pending) return;
    const storedToast = sessionStorage.getItem("delayedToast");
    if (storedToast) {
      setToast(JSON.parse(storedToast));
      sessionStorage.removeItem("delayedToast"); // Remove after displaying
      setTimeout(() => setToast(null), 3000);
    }
  }, [pending]);

  // Function to display toast immediately
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Function to set a delayed toast (stored in sessionStorage)
  const delayedToast = (message, type = "success") => {
    sessionStorage.setItem("delayedToast", JSON.stringify({ message, type }));
    setPending(true);
  };

  return (
    <ToastContext.Provider value={{ showToast, delayedToast }}>
      {children}
      {toast && (
        <div
          className={`fixed top-5 right-5 p-4 rounded shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
