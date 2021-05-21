import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DateMillisecondsPipe } from './pipes/date-milliseconds.pipe';
import { ModalDirective } from './directives/modal.directive';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [DateMillisecondsPipe, ModalDirective, DialogConfirmComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [DateMillisecondsPipe, ModalDirective, DialogConfirmComponent],
})
export class SharedModule {}
