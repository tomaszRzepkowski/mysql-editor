import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {DBUserData} from '../model/DBUserData';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  form: UserForm = new UserForm();
  @Input() selectedUser: string;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {

  }

  private applyDataToForm(userData: DBUserData): void {
    this.form.username.setValue(userData.username);
    this.form.host.setValue(userData.host);
  }

  fetchUserDetails(selectedUser?: string): void {
    this.userService.getUserData(selectedUser).subscribe((userData: DBUserData) => {
      this.applyDataToForm(userData);
    });
  }
}

export class UserForm {
  username = new FormControl();
  host = new FormControl();
}
