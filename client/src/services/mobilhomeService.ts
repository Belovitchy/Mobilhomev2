import api from "./api";
import type { TypeManager, TypeMobilhome,  } from "../types/TypeFiles";

export const getMobilhomesByOwner = async (id: number) => {
  const { data } = await api.get<TypeMobilhome[]>(
    `/api/owners/${id}/mobilhomes`
  );
  return data;
};

export const getManagersByOwner = async (id: number) => {
    const { data } = await api.get<TypeManager[]>(
    `/api/owners/${id}/managers`
  );
  return data;
}





