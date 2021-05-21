import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoleAccessGuard } from './auth/guards/role-access.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'user',
    canActivate: [RoleAccessGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'role',
    canActivate: [RoleAccessGuard],
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
