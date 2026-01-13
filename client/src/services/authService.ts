import api from "./api";
import type { TypeOwner } from "../types/TypeFiles";

type LoginResponse = {
    token: string;
    owner: TypeOwner;
};

export const login  = async (email: string, password: string) => {
    const {data} = await api.post<LoginResponse>("/api/auth/login", {
        email,
        password    
    });
    return data;    
};

export const getMe = async () => {
    const {data} = await api.get<TypeOwner>("/api/auth/me");
    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};



