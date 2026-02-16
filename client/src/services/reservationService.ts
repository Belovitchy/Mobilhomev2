import type { TypeNewReservation } from "../types/TypeFiles";
import api from "./api";

export const addResa = async (
	ownerId: number,
	mobilhomeId: number,
	data: TypeNewReservation,
) => {
	const res = await api.post<TypeNewReservation>(
		`/api/owners/${ownerId}/mobilhomes/${mobilhomeId}/reservations`,
		data,
	);
	return res.data;
};
