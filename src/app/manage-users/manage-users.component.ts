import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {BehaviorSubject} from 'rxjs';
import {UserDetailsComponent} from '../user-details/user-details.component';
import {NewUserComponent} from '../user-details/new-user/new-user.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  usersData: ColumnsAndRows;
  dataLoaded = new BehaviorSubject<ColumnsAndRows>(null);
  selectedUser: string;
  newUser = false;

  @ViewChild('userDetailsComponent') userDetailsComponent: UserDetailsComponent;
  @ViewChild('newUserComponent') newUserComponent: NewUserComponent;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data: ColumnsAndRows) => {
      this.usersData = data;
      this.dataLoaded.next(data);
      console.log(data);
    });
  }

  selectUser(event: any): void {
    console.log(event);
    this.selectedUser = event.user;
    this.userDetailsComponent.fetchUserDetails(this.selectedUser);
  }

  createUser(): void {
    this.newUser = true;
  }
}
