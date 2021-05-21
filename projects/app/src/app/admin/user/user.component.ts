import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { AlertModel } from '../../shared/models/alert.model';
import { RoleExtraModel } from '../role/role.model';
import { RoleService } from '../role/role.service';
import { UserModel } from './user.model';
import { UserService } from './user.service';

interface UserUIDModel extends UserModel {
  uid: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  formGroup: FormGroup;
  nameControl: FormControl;
  roleControl: FormControl;
  emailControl: FormControl;
  alert: AlertModel | null = null;
  currentUIDEdit: string | null = null;
  sidenavOpened: boolean = false;

  constructor(
    public dialog: MatDialog,
    public roleService: RoleService,
    public userService: UserService
  ) {
    this.nameControl = new FormControl('', Validators.required);
    this.roleControl = new FormControl('', Validators.required);
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.formGroup = new FormGroup({
      active: new FormControl(true),
      block: new FormControl(false),
      createdAt: new FormControl(new Date(), Validators.required),
      email: this.emailControl,
      name: this.nameControl,
      role: this.roleControl,
    });
  }

  ngOnInit(): void {}

  resetForm() {
    this.formGroup.patchValue({
      active: true,
      block: false,
      createdAt: new Date(),
      name: '',
      email: '',
      role: '',
    });
  }

  onSelectRole(event: Event, item: RoleExtraModel) {
    event.preventDefault();
    event.stopPropagation();

    console.log(item);
  }

  onNew(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.resetForm();

    this.currentUIDEdit = null;
    this.sidenavOpened = true;
    this.alert = null;
  }

  onEdit(event: Event, item: UserModel) {
    event.preventDefault();
    event.stopPropagation();

    this.formGroup.patchValue(item);
    this.currentUIDEdit = ((<unknown>item) as UserUIDModel).uid;
    this.sidenavOpened = true;
  }

  onDelete(event: Event, item: UserModel) {
    event.preventDefault();
    event.stopPropagation();

    this.dialog
      .open(DialogConfirmComponent, {
        data: {
          type: 'danger',
          title: 'Alerta',
          message: `¿Seguro que quiere eliminar a <b>'${item.name}'</b>, no podrás recuperarlo después?`,
          buttons: {
            cancel: 'Cancelar',
            action: 'Eliminar',
          },
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.userService.delete((item as UserUIDModel).uid);
        }
      });
  }

  save(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.formGroup.valid) {
      this.userService
        .save(new UserModel(this.formGroup.value), this.currentUIDEdit)
        .then(
          () =>
            (this.alert = {
              message:
                'Se ha guardado correctamente, por favor ingresa <a href="/admin/auth/set-password">aquí para crear una contraseña</a> o enviale el siguiente link al usuario http://localhost:4200/admin/auth/set-password',
              type: 'success',
            })
        )
        .catch(
          (error) =>
            (this.alert = {
              message: error?.message || 'Hubo un error, intentalo de nuevo',
              type: 'danger',
            })
        );
    }
  }
}
