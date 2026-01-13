import api from "./api";
import type { TypeMobilhome,  } from "../types/TypeFiles";

export const getMobilhomesByOwner = async (id: number) => {
  const { data } = await api.get<TypeMobilhome[]>(
    `/api/owners/${id}/mobilhomes`
  );
  return data;
};


export const getMobilhomeDetail = async (id: number) => {
  const { data } = await api.get<TypeMobilhome>(`/api/mobilhome/${id}`);
  return data;
};




