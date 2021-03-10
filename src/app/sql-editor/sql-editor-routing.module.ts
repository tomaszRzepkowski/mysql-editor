import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SqlEditorComponent} from './sql-editor.component';

const routes: Routes = [
  {path: '', component: SqlEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlEditorRoutingModule { }
