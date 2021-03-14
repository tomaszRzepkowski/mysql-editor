import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbConnectorComponent } from './db-connector.component';
import {DbConnectorRoutingModule} from './db-connector-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [DbConnectorComponent],
  imports: [
    CommonModule,
    DbConnectorRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class DbConnectorModule { }
