import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'projects/app/src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { take } from 'rxjs/operators';
import { UserModel } from '../../../user/user.model';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  addEmail: boolean = true;
  email: string = '';

  constructor(
    public dialog: MatDialog,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  setPassword(event: Event, email: string, password: string) {
    event.preventDefault();
    event.stopPropagation();

    if (email && password) {
      this.firestore
        .collection<UserModel>('users', (ref) =>
          ref.where('email', '==', email)
        )
        .valueChanges()
        .pipe(take(1))
        .subscribe((data) => {
          console.log('>> data', data);
          if (data.length > 0) {
            this.auth.createUserWithEmailAndPassword(email, password).then(() => {
              this.dialog
                .open(DialogConfirmComponent, {
                  data: {
                    type: 'success',
                    title: 'Alerta',
                    message: `La constraseña ha sido creada correctamente`,
                    buttons: {
                      cancel: 'Cancelar',
                      action: 'Aceptar',
                    },
                  },
                })
                .afterClosed();
            });
          } else {
            this.dialog
              .open(DialogConfirmComponent, {
                data: {
                  type: 'danger',
                  title: 'Alerta',
                  message: `El correo no existe`,
                  buttons: {
                    cancel: 'Cancelar',
                    action: 'Aceptar',
                  },
                },
              })
              .afterClosed();
          }
        });
    }
    console.log(email, password);
  }
}
