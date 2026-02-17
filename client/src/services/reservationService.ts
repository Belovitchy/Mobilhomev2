import type { TypeNewReservation, TypeReservation } from "../types/TypeFiles";
import api from "./api";

export const addResa = async (
	ownerId: number,
	mobilhomeId: number,
	data: TypeNewReservation,
) => {
	const res = await api.post<TypeReservation>(
		`/api/owners/${ownerId}/mobilhomes/${mobilhomeId}/reservations`,
		data,
	);
	return res.data;
};

export const deleteResa = async (
	ownerId: number,
	mobilhomeId: number,
	resaId: number,
) => {
	const res = await api.delete<TypeReservation>(
		`api/owners/${ownerId}/mobilhomes/${mobilhomeId}/reservations/${resaId}`,
	);
	return res.data;
};
