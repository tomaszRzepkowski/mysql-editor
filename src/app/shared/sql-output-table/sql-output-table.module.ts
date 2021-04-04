import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SqlOutputTableComponent} from './sql-output-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [SqlOutputTableComponent],
  exports: [
    SqlOutputTableComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        MatTooltipModule
    ]
})
export class SqlOutputTableModule { }
