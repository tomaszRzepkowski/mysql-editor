import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SqlOutputTableComponent} from './sql-output-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClipboardModule} from '@angular/cdk/clipboard';



@NgModule({
  declarations: [SqlOutputTableComponent],
  exports: [
    SqlOutputTableComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        MatTooltipModule,
        ClipboardModule
    ]
})
export class SqlOutputTableModule { }
