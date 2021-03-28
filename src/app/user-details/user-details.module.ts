import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { NewUserComponent } from './new-user/new-user.component';



@NgModule({
  declarations: [UserDetailsComponent, NewUserComponent],
  exports: [
    UserDetailsComponent, NewUserComponent
  ],
    imports: [
        CommonModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule
    ]
})
export class UserDetailsModule { }
