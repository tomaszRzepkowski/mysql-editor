import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '*', redirectTo: 'sql'},
  {path: 'connect',  loadChildren: () => import('./db-connector/db-connector.module').then(m => m.DbConnectorModule)},
  {path: 'sql',  loadChildren: () => import('./sql-editor/sql-editor.module').then(m => m.SqlEditorModule)},
  {path: 'users',  loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
