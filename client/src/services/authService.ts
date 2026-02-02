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

export const modifMail = async (id: number, email: string) => {
    const {data} = await api.patch<TypeOwner>(`/api/owners/${id}/email`, {
        email
    });
    return data;
};

export const modifPassword = async (id: number, oldPassword: string, newPassword: string) => {
    const {data} = await api.patch<TypeOwner>(`/api/owners/${id}/password`, {
        oldPassword,
        newPassword
    });
    return data;
}

export const signIn = async (name: string, email: string, password: string, isAdmin: boolean) => {
    const {data} = await api.post<TypeOwner>("/api/auth/signin", {
        name,
        email,
        password,
        isAdmin
    });
    return data;
};







