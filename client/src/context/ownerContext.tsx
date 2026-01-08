import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router";
import type { TypeOwner } from "../types/TypeFiles";

type OwnerContextType = {
  isConnected: boolean;
  owner: TypeOwner | null;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setOwner: React.Dispatch<React.SetStateAction<TypeOwner | null>>; //
};
const OwnerContext = createContext<OwnerContextType | undefined>(undefined);

export function OwnerProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<TypeOwner | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsConnected(false);
        setOwner(null);
        if (location.pathname !== "/") {
          navigate("/");
        }
        return;
      }

      fetch(`${import.meta.env.VITE_API_URL}/api/owner`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message !== "noToken") {
            setOwner(data.owner);
            setIsConnected(true);
          } else {
            setOwner(null);
            setIsConnected(false);
            localStorage.removeItem("token");
            navigate("/");
          }
        });
    };
    checkToken();
    const intervalId = setInterval(checkToken, 30 * 60 * 1000); // toutes les 30 minutes

    return () => clearInterval(intervalId); // Nettoyage si le composant est démonté
  }, [location.pathname, navigate]);

  return (
    <OwnerContext.Provider
      value={{ owner, setOwner, isConnected, setIsConnected }}
    >
      {children}
    </OwnerContext.Provider>
  );
}

export const useOwner = () => {
  const value = useContext(OwnerContext);
  if (!value) {
    throw new Error("useOwner must be used within an OwnerProvider");
  }
  return value;
};
