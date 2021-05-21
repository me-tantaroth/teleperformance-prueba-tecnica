import { DocumentReference } from '@angular/fire/firestore';
import { RoleModel } from '../role/role.model';

export interface UserOptionalModel {
  active?: boolean;
  block?: boolean;
  createdAt?: Date;
  email?: string;
  name?: string;
  role?: DocumentReference<RoleModel>;
}
export interface UserModel {
  active: boolean;
  block: boolean;
  createdAt: Date;
  email: string;
  name: string;
  role: DocumentReference<RoleModel>;
}
export class UserModel {
  constructor(data?: UserOptionalModel) {
    return {
      active: data?.active || false,
      block: data?.block || false,
      createdAt: data?.createdAt || new Date(),
      email: data?.email || '',
      name: data?.name || '',
      role: data?.role || null,
    } as UserModel;
  }
}
