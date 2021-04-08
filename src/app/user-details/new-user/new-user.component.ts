import {Component, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {DBUserData} from '../../model/DBUserData';
import {EventEmitter} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  host = new FormControl('%', Validators.required);
  username = new FormControl('username', Validators.required);
  password = new FormControl(null, Validators.required);
  @Output() userCreated = new EventEmitter<boolean>();

  constructor(private userService: UsersService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  createUser(): void {
    this.userService.createUser(this.convertToModel()).subscribe((response) => {
      console.log(response);
      this.snackBar.open('User created successfully');
      this.userCreated.emit(true);
    }, (error) => {
      this.snackBar.open('Couldn\'t create user: ' + error.error.message);
    });
  }
  convertToModel(): DBUserData {
    const data = new DBUserData();
    data.host = this.host.value;
    data.username = this.username.value;
    data.password = this.password.value;
    return data;
  }

  cancel(): void {
    this.userCreated.emit(false);
  }
}
