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


@NgModule({
  declarations: [SqlEditorComponent],
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
    MatIconModule
  ]
})
export class SqlEditorModule { }
