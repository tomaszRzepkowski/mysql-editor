import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {DataAndRows} from '../model/DataAndRows';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  usersColumns: string[];
  usersData: object[];
  // usersData: DataAndRows;
  dataLoaded = new BehaviorSubject<boolean>(false);

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data: DataAndRows) => {
      // this.usersColumns = data.columns;
      // this.usersData = data.rows;
      // this.usersData = new DataAndRows();
      this.usersColumns = data.columns;
      this.usersData = data.rows;
      this.dataLoaded.next(true);
      console.log(data);
    });
  }

  clik(): void {
    this.usersService.getUsers().subscribe((data: DataAndRows) => {
      // this.usersColumns = data.columns;
      // this.usersData = data.rows;
      // this.usersData = new DataAndRows();
      this.usersColumns = data.columns;
      this.usersData = data.rows;
      this.dataLoaded.next(true);
      console.log(data);
    });
  }
}
