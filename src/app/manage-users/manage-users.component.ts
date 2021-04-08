import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {BehaviorSubject} from 'rxjs';
import {UserDetailsComponent} from '../user-details/user-details.component';
import {NewUserComponent} from '../user-details/new-user/new-user.component';
import {ResponseMapper} from '../shared/response-mapper';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  usersData: ColumnsAndRows;
  outputData: any[];
  outputColumns: any[];
  dataLoaded = new BehaviorSubject<ColumnsAndRows>(null);
  selectedUser: string;
  selectedHost: string;
  newUser = false;
  deleteDialogRef: MatDialogRef<any>;

  @ViewChild('userDetailsComponent') userDetailsComponent: UserDetailsComponent;
  @ViewChild('newUserComponent') newUserComponent: NewUserComponent;
  @ViewChild('deleteDialogModal') deleteDialogModal: TemplateRef<any>;

  constructor(private usersService: UsersService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.refreshUsersList();
  }

  refreshUsersList(): void {
    this.usersService.getUsers().subscribe((data: ColumnsAndRows) => {
      this.usersData = data;
      this.dataLoaded.next(data);
      this.outputColumns = this.usersData.columns;
      this.outputData = ResponseMapper.remapAsObjectArray(this.usersData);
    });
  }

  selectUser(event: any): void {
    this.selectedUser = event.user;
    this.selectedHost = event.host;
    this.userDetailsComponent.fetchUserDetails(this.selectedUser);
  }

  createUser(): void {
    this.newUser = true;
  }

  showDeleteUserDialog(): void {
    this.deleteDialogRef = this.dialog.open(this.deleteDialogModal, null);
  }

  cancelDelete(): void {
    this.deleteDialogRef.close();
  }

  executeDelete(): void {
    this.usersService.deleteUser(this.selectedHost, this.selectedUser).subscribe(() => {
      this.refreshUsersList();
      this.snackBar.open('Removed user successfully');
      this.deleteDialogRef.close();
    }, (error) => {
      this.snackBar.open(error.error.message);
    });
  }

  finishUserUpdate($event: boolean): void {
    this.refreshUsersList();
    this.selectedUser = null;
  }

  handleUserCreated($event: boolean): void {
    this.newUser = false;
    this.refreshUsersList();
    this.selectedUser = null;
  }
}
