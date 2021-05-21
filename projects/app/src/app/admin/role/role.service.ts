import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleModel } from './role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  rolesCollection: AngularFirestoreCollection<RoleModel>;
  items$: Observable<RoleModel[]>;

  constructor(firestore: AngularFirestore) {
    this.rolesCollection = firestore.collection<RoleModel>('roles');
    this.items$ = this.rolesCollection.snapshotChanges().pipe(
      map((docsChangeAction) =>
        docsChangeAction.map(
          (docChangeAction) =>
            (<unknown>{
              ...docChangeAction.payload.doc.data(),
              uid: docChangeAction.payload.doc.id,
            }) as RoleModel
        )
      )
    );
  }

  save(
    item: RoleModel,
    uid?: string | null
  ): Promise<void | DocumentReference<RoleModel>> {
    return uid
      ? this.rolesCollection.doc(uid).set(item)
      : this.rolesCollection.add(item);
  }

  delete(uid: string): Promise<void> {
    return this.rolesCollection.doc(uid).delete();
  }
}
