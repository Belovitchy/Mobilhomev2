import api from "./api";
import type {  TypeLink } from "../types/TypeFiles";

export const addLink = async (id: number, Name: string, Url: string) => {
    const {data} = await api.post<TypeLink>(`/api/owners/${id}/links`, {
        Name,
        Url
    });
    return data;
}

export const deleteLink = async (id: number, linkId: number) => {
    const {data} = await api.delete<TypeLink>(`/api/owners/${id}/links/${linkId}`);
    return data;
}

export const modifLink = async (id: number, linkId: number, Name: string, Url: string) => {
    const {data} = await api.put<TypeLink>(`/api/owners/${id}/links/${linkId}`, {
        Name,
        Url
    });
    return data;
}