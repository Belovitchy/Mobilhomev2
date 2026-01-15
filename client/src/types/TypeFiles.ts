export interface TypeOwner {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface TypeMobilhome {
  id: number;
  name: string;
  icalLink: string;
  managerId:number  
  manager:TypeManager  
}

export interface TypeNewMobilhome {
  name: string;
  icalLink: string | null;
  managerId: number;
}

export interface TypeModifMobilhome{
  id : number;
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
