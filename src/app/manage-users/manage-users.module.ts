import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';
import {ManageUsersRoutingModule} from './manage-users-routing.module';
import {SqlOutputTableModule} from '../shared/sql-output-table/sql-output-table.module';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    SqlOutputTableModule,
    MatCardModule
  ]
})
export class ManageUsersModule { }
