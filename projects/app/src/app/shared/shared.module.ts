import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DateMillisecondsPipe } from './pipes/date-milliseconds.pipe';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [DateMillisecondsPipe, DialogConfirmComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [DateMillisecondsPipe, DialogConfirmComponent],
})
export class SharedModule {}
