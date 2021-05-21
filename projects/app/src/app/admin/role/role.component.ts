import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertModel } from '../../shared/models/alert.model';
import { RoleModel } from './role.model';
import { RoleService } from './role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  formGroup: FormGroup;
  nameControl: FormControl;
  alert: AlertModel | null = null;

  constructor(public roleService: RoleService) {
    this.nameControl = new FormControl('', Validators.required);
    this.formGroup = new FormGroup({
      active: new FormControl(true),
      block: new FormControl(false),
      createdAt: new FormControl(new Date(), Validators.required),
      name: this.nameControl,
    });
  }

  ngOnInit(): void {}

  save(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.formGroup.valid) {
      this.roleService
        .save(new RoleModel(this.formGroup.value))
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
