import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  onLogin(event: Event, email: string, password: string) {
    event.stopPropagation();
    event.preventDefault();

    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.dialog
        .open(DialogConfirmComponent, {
          data: {
            type: 'success',
            title: 'Alerta',
            message: `Bienvenido`,
            buttons: {
              cancel: 'Cancelar',
              action: 'Aceptar',
            },
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result === true) {
            this.router.navigate(['/admin']); 
          }
        });
    });
  }
}
