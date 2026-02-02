import api from "./api";
import type { TypeOwner } from "../types/TypeFiles";

export const getOwners = async () => {
    const {data} = await api.get<TypeOwner[]>("/api/admin/owners");
    return data;
};