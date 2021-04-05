import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SqlEditorComponent} from './sql-editor.component';
import {SqlEditorRoutingModule} from './sql-editor-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {SqlOutputTableModule} from '../shared/sql-output-table/sql-output-table.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import { SqlTableTreeComponent } from './sql-table-tree/sql-table-tree.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SqlInputTableModule} from '../shared/sql-input-table/sql-input-table.module';


@NgModule({
  declarations: [SqlEditorComponent, SqlTableTreeComponent],
  imports: [
    CommonModule,
    SqlEditorRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    SqlOutputTableModule,
    MatMenuModule,
    MatTreeModule,
    MatDialogModule,
    SqlInputTableModule
  ]
})
export class SqlEditorModule { }
