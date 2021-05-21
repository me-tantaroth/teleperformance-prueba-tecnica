import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertModel } from '../../shared/models/alert.model';
import { RoleModel } from './role.model';
import { RoleService } from './role.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';

interface RoleUIDModel extends RoleModel {
  uid: string;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  formGroup: FormGroup;
  nameControl: FormControl;
  alert: AlertModel | null = null;
  currentUIDEdit: string | null = null;
  sidenavOpened: boolean = false;

  constructor(public dialog: MatDialog, public roleService: RoleService) {
    this.nameControl = new FormControl('', Validators.required);
    this.formGroup = new FormGroup({
      active: new FormControl(true),
      block: new FormControl(false),
      createdAt: new FormControl(new Date(), Validators.required),
      name: this.nameControl,
    });
  }

  ngOnInit(): void {}

  resetForm() {
    this.formGroup.patchValue({
      active: true,
      block: false,
      createdAt: new Date(),
      name: '',
    });
  }

  onNew(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.resetForm();

    this.currentUIDEdit = null;
    this.sidenavOpened = true;
  }

  onEdit(event: Event, item: RoleModel) {
    event.preventDefault();
    event.stopPropagation();

    this.formGroup.patchValue(item);
    this.currentUIDEdit = ((<unknown>item) as RoleUIDModel).uid;
    this.sidenavOpened = true;
  }

  onDelete(event: Event, item: RoleModel) {
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
          this.roleService.delete((item as RoleUIDModel).uid);
        }
      });
  }

  save(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.formGroup.valid) {
      this.roleService
        .save(new RoleModel(this.formGroup.value), this.currentUIDEdit)
        .then(
          () =>
            (this.alert = {
              message: 'Se ha guardado correctamente',
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
