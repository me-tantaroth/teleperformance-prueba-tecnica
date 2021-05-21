export interface UserOptionalModel {
  active?: boolean;
  block?: boolean;
  createdAt?: Date;
  email?: string;
  name?: string;
}
export interface UserModel {
  active: boolean;
  block: boolean;
  createdAt: Date;
  email: string;
  name: string;
}
export class UserModel {
  constructor(data?: UserOptionalModel) {
    return {
      active: data?.active || false,
      block: data?.block || false,
      createdAt: data?.createdAt || new Date(),
      email: data?.email || '',
      name: data?.name || '',
    } as UserModel;
  }
}
