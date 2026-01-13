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
 manager:TypeManager  
}

export interface TypeManager {
  id: number;
  name: string;
  firstname: string;
  email: string;
  telephone: string;
  owner_id: number;
}
