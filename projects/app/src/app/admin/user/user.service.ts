import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  rolesCollection: AngularFirestoreCollection<UserModel>;
  items$: Observable<UserModel[]>;

  constructor(firestore: AngularFirestore) {
    this.rolesCollection = firestore.collection<UserModel>('users');
    this.items$ = this.rolesCollection.snapshotChanges().pipe(
      map((docsChangeAction) =>
        docsChangeAction.map(
          (docChangeAction) =>
            (<unknown>{
              ...docChangeAction.payload.doc.data(),
              uid: docChangeAction.payload.doc.id,
              ref: docChangeAction.payload.doc.ref,
            }) as UserModel
        )
      )
    );
  }

  save(
    item: UserModel,
    uid?: string | null
  ): Promise<void | DocumentReference<UserModel>> {
    return uid
      ? this.rolesCollection.doc(uid).set(item)
      : this.rolesCollection.add(item);
  }

  delete(uid: string): Promise<void> {
    return this.rolesCollection.doc(uid).delete();
  }
}
