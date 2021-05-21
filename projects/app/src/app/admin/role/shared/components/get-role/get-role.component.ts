import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleModel } from '../../../role.model';

@Component({
  selector: 'app-get-role',
  templateUrl: './get-role.component.html',
  styleUrls: ['./get-role.component.scss'],
})
export class GetRoleComponent implements OnInit {
  @Input() ref: DocumentReference<RoleModel> | null = null;
  @Input() prop: string = 'name';
  value$: Observable<string> | null = null;

  constructor(private firestore: AngularFirestore) {}

  log(data: any) {
    console.log(data);
  }
  ngOnInit(): void {
    if (this.ref?.path) {
      const refPath: string = this.ref?.path as string;
      this.value$ = this.firestore
        .doc<RoleModel>(refPath)
        .valueChanges()
        .pipe(
          map((value) =>
            value && ((<unknown>value) as any)[this.prop]
              ? ((<unknown>value) as any)[this.prop]
              : ''
          )
        );
    }
  }
}
