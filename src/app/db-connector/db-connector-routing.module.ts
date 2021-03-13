import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DbConnectorComponent} from './db-connector.component';

const routes: Routes = [
  {path: '', component: DbConnectorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbConnectorRoutingModule { }
