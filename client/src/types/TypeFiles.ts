export interface TypeOwner {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface TypeMobilhome {
  id: number;
  mobilhomeName: string;
  managerName: string;
  managerFirstname: string;
  name: string;
  manager_id: number;
  owner_id: number;
}

export interface TypeManager {
  id: number;
  name: string;
  firstname: string;
  email: string;
  telephone: string;
}
