import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router";
import type { TypeOwner } from "../types/TypeFiles";
import { getMe, logout } from "../services/authService";
import { isAdminFromToken } from "../utils/jwt";

type OwnerContextType = {
  isConnected: boolean;
  owner: TypeOwner | null;
  isAdmin: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setOwner: React.Dispatch<React.SetStateAction<TypeOwner | null>>; //
};
const OwnerContext = createContext<OwnerContextType | undefined>(undefined);

export function OwnerProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<TypeOwner | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const isAdmin = useMemo(() => {
    if (!token) return false;
    return isAdminFromToken(token);
  }, [token]);

  useEffect(() => {
    if (location.pathname === "/") return;

    const checkToken = async () => {
      try {
        const me = await getMe();
        setOwner(me);
        setIsConnected(true);
      } catch {
        logout();
        setOwner(null);
        setIsConnected(false);
        if (location.pathname !== "/") navigate("/");
      }
    };

    checkToken();
    const id = setInterval(checkToken, 30 * 60 * 1000);
    return () => clearInterval(id);
  }, [location.pathname, navigate]);

  const contextValue = useMemo(
    () => ({ owner, setOwner, isConnected, setIsConnected, isAdmin }),
    [owner, isConnected, isAdmin],
  );

  return (
    <OwnerContext.Provider value={contextValue}>
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
