import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RoleModel } from './role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  rolesCollection: AngularFirestoreCollection<RoleModel>;
  items$: Observable<RoleModel[]>;

  constructor(firestore: AngularFirestore) {
    this.rolesCollection = firestore.collection<RoleModel>('roles');
    this.items$ = this.rolesCollection.valueChanges();
  }

  save(item: RoleModel, uid?: string): Promise<void> {
    return this.rolesCollection.doc(uid).set(item);
  }

  delete(uid: string): Promise<void> {
    return this.rolesCollection.doc(uid).delete();
  }
}
