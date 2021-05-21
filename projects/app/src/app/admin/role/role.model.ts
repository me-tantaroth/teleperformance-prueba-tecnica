import { DocumentReference } from '@angular/fire/firestore';

export interface RoleExtraModel extends RoleModel {
  uid: string;
  ref: DocumentReference<RoleModel>;
}

export interface RoleOptionalModel {
  active?: boolean;
  block?: boolean;
  createdAt?: Date;
  name?: string;
}
export interface RoleModel {
  active?: boolean;
  block?: boolean;
  createdAt: Date;
  name: string;
}
export class RoleModel {
  constructor(data?: RoleOptionalModel) {
    return {
      active: data?.active || false,
      block: data?.block || false,
      createdAt: data?.createdAt || new Date(),
      name: data?.name || '',
    } as RoleModel;
  }
}
