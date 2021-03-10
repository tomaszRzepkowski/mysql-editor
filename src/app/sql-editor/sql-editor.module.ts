import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SqlEditorComponent} from './sql-editor.component';
import {SqlEditorRoutingModule} from './sql-editor-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SqlEditorComponent],
  imports: [
    CommonModule,
    SqlEditorRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class SqlEditorModule { }
