export interface TypeOwner {
	id: number;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	links: TypeLink[];
}

export interface TypeLink {
	id: number;
	name: string;
	url: string;
	owner_id: number;
}

export interface TypeMobilhome {
	id: number;
	name: string;
	ownerId: number;
	icalLink: string;
	managerId: number;
	manager: TypeManager;
	reservations: TypeReservation[];
}

export interface TypeNewMobilhome {
	name: string;
	icalLink: string | null;
	managerId: number;
}

export interface TypeModifMobilhome {
	id: number;
	name: string;
	icalLink: string | null;
	managerId: number;
}

export interface TypeManager {
	id: number;
	name: string;
	firstname: string;
	email: string;
	telephone: string;
	owner_id: number;
}

export interface TypeReservation {
	id: number;
	name: string;
	color: string;
	comment: string;
	email: string;
	endDate: Date;
	startDate: Date;
	numberPerson: number;
	phone: string;
}

export interface TypeNewReservation {
	name: string;
	color: string;
	comment: string;
	email: string;
	endDate: string;
	startDate: string;
	numberPerson: number;
	phone: string;
}
