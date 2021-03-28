import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {DBUserData} from '../../model/DBUserData';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  host = new FormControl('%', Validators.required);
  username = new FormControl('username', Validators.required);
  password = new FormControl(null, Validators.required);
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    this.userService.createUser(this.convertToModel()).subscribe((response) => {
      console.log(response);
    });
  }
  convertToModel(): DBUserData {
    const data = new DBUserData();
    data.host = this.host.value;
    data.username = this.username.value;
    data.password = this.password.value;
    return data;
  }
}
