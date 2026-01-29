import api from "./api";
import type {  TypeLink } from "../types/TypeFiles";

export const addLink = async (id: number, Name: string, Url: string) => {
    const {data} = await api.post<TypeLink>(`/api/owners/${id}/links`, {
        Name,
        Url
    });
    return data;
}