import api from "./api";
import type { TypeNewVacationer, TypeVacationer } from "../types/TypeFiles";

export const addVacationer = async (
	ownerId: number,
	mobilhomeId: number,
	resaId: number,
	vacationer: TypeNewVacationer,
) => {
	const { data } = await api.post<TypeVacationer>(
		`/api/owners/${ownerId}/mobilhomes/${mobilhomeId}/reservations/${resaId}/vacationers`,
		vacationer,
	);
	return data;
};

export const updateVacationer = async (
	ownerId: number,
	mobilhomeId: number,
	resaId: number,
	vacationerId: number,
	vacationer: TypeVacationer,
) => {
	const { data } = await api.put<TypeVacationer>(
		`/api/owners/${ownerId}/mobilhomes/${mobilhomeId}/reservations/${resaId}/vacationers/${vacationerId}`,
		vacationer,
	);
	return data;
};
