import api from "./api";
import type {
  TypeManager,
  TypeMobilhome,
  TypeNewMobilhome,
} from "../types/TypeFiles";

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

export const getManagersByOwner = async (id: number) => {
  const {data} = await api.get<TypeManager[]>(`/api/owners/${id}/managers`);
  return data;
  
};

export const addMobilhomeOwner = async (
  id: number,
  data: TypeNewMobilhome
) => {
  const res = await api.post<TypeMobilhome>(
    `/api/owners/${id}/mobilhomes`,
    data
  );
  return res.data;
};




