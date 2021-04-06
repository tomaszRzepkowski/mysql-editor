import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlInputTableComponent } from './sql-input-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [SqlInputTableComponent],
  exports: [
    SqlInputTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class SqlInputTableModule { }
