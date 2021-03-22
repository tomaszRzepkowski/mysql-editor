import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {BehaviorSubject} from 'rxjs';
import {UserDetailsComponent} from '../user-details/user-details.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  // usersColumns: string[];
  // usersData: object[];
  usersData: ColumnsAndRows;
  dataLoaded = new BehaviorSubject<ColumnsAndRows>(null);
  selectedUser: string;

  @ViewChild('userDetailsComponent') userDetailsComponent: UserDetailsComponent;

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
}
