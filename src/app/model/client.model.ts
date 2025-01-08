import {Roles} from "./Roles";
import {AccountType} from "./AccountType";

export interface Client {
  id?: number;
  lastname: string;
  firstname: string;
  email: string;
  phonenumber: string;
  numcin: string;
  password: string;
  cinRectoPath: string | ArrayBuffer | null;
  cinVersoPath: string | ArrayBuffer | null;
  firstLogin: boolean;
  role: Roles;
  accountType: AccountType;
  token?: string;
  userId: number;
}
