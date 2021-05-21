import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetRoleComponent } from './components/get-role/get-role.component';

@NgModule({
  declarations: [GetRoleComponent],
  imports: [CommonModule],
  exports: [GetRoleComponent],
})
export class SharedModule {}
