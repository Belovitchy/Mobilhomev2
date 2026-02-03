import api from "./api";
import type { TypeOwner } from "../types/TypeFiles";

export const getOwners = async () => {
    const {data} = await api.get<TypeOwner[]>("/api/admin/owners");
    return data;
};

export const signIn = async (id:number, name: string, email: string, password: string, isAdmin: boolean) => {
    const {data} = await api.post<TypeOwner>(`/api/admin/signin/${id}`, {
        name,
        email,
        password,
        isAdmin
    });
    return data;
};

export const deleteOwner = async (id: number, ownerId: number) => {
    const {data} = await api.delete<TypeOwner>(`/api/admin/${id}/owner/${ownerId}`);
    return data;
};