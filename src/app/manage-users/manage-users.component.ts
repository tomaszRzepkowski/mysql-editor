import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {BehaviorSubject} from 'rxjs';

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

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data: ColumnsAndRows) => {
      this.usersData = data;
      this.dataLoaded.next(data);
      console.log(data);
    });
  }
}
