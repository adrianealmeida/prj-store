import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AboutModule { }
