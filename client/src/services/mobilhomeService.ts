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


export const getMobilhomeDetail = async (ownerId: number, id:number) => {
  const { data } = await api.get<TypeMobilhome>(`/api/owners/${ownerId}/mobilhomes/${id}`);
  return data;
};

export const getManagersByOwner = async (id: number) => {
  const {data} = await api.get<TypeManager[]>(`/api/owners/${id}/managers`);
  return data;
  
};

export const addMobilhomeOwner = async (
  ownerId: number,
  data: TypeNewMobilhome
) => {
  const res = await api.post<TypeMobilhome>(
    `/api/owners/${ownerId}/mobilhomes`,
    data
  );
  return res.data;
};

export const modifMobilhomeOwner = async (
  ownerId: number,
  mobilhomeId: number,  
  data: TypeNewMobilhome
) => {
  const res = await api.put<TypeMobilhome>(
    `/api/owners/${ownerId}/mobilhomes/${mobilhomeId}`,
    data
  );
  return res.data;
};

export const deleteMobilhomeOwner = async (
  ownerId: number,
  mobilhomeId: number
) => {
  const res = await api.delete(`/api/owners/${ownerId}/mobilhomes/${mobilhomeId}`);
  return res.data;
};




