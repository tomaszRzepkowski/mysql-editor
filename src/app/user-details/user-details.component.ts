import {Component, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {DBUserData} from '../model/DBUserData';
import {EventEmitter} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  form: UserForm = new UserForm();
  @Input() selectedUser: string;
  @Output() userUpdated = new EventEmitter<boolean>();
  constructor(private userService: UsersService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  fetchUserDetails(selectedUser?: string): void {
    this.userService.getUserData(selectedUser).subscribe((userData: DBUserData) => {
      this.applyDataToForm(userData);
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.form.convertToModel()).subscribe((response) => {
      this.snackBar.open('User updated');
      this.userUpdated.emit(true);
    }, error => {
      this.snackBar.open('Couldn\'t update user: ' + error.error.message, null, {panelClass: 'snack-error'});
    });
  }

  private applyDataToForm(userData: DBUserData): void {
    this.form.host.setValue(userData.host);
    this.form.username.setValue(userData.username);
    this.form.lastPasswordChange.setValue(userData.lastPasswordChange);
    this.form.accountLocked.setValue(userData.accountLocked);
    this.form.selectPrivilege.setValue(userData.selectPrivilege);
    this.form.insertPrivilege.setValue(userData.insertPrivilege);
    this.form.updatePrivilege.setValue(userData.updatePrivilege);
    this.form.deletePrivilege.setValue(userData.deletePrivilege);
    this.form.createPrivilege.setValue(userData.createPrivilege);
    this.form.dropPrivilege.setValue(userData.dropPrivilege);
    this.form.reloadPrivilege.setValue(userData.reloadPrivilege);
    this.form.shutdownPrivilege.setValue(userData.shutdownPrivilege);
    this.form.grantPrivilege.setValue(userData.grantPrivilege);
    this.form.indexPrivilege.setValue(userData.indexPrivilege);
    this.form.alterPrivilege.setValue(userData.alterPrivilege);
    this.form.showDbPrivilege.setValue(userData.showDbPrivilege);
    this.form.executePrivilege.setValue(userData.executePrivilege);
    this.form.triggerPrivilege.setValue(userData.triggerPrivilege);
    this.form.dropRolePrivilege.setValue(userData.dropRolePrivilege);
    this.form.createTablespacePrivilege.setValue(userData.createTablespacePrivilege);
    this.form.createRolePrivilege.setValue(userData.createRolePrivilege);
    this.form.createUserPrivilege.setValue(userData.createUserPrivilege);
    this.form.eventPrivilege.setValue(userData.eventPrivilege);
  }

  cancel(): void {
    this.userUpdated.emit(false);
  }
}

export class UserForm {
  host = new FormControl(null, Validators.required);
  username = new FormControl(null, Validators.required);
  lastPasswordChange = new FormControl(null);
  accountLocked = new FormControl(null, Validators.required);
  selectPrivilege = new FormControl(null, Validators.required);
  insertPrivilege = new FormControl(null, Validators.required);
  updatePrivilege = new FormControl(null, Validators.required);
  deletePrivilege = new FormControl(null, Validators.required);
  createPrivilege = new FormControl(null, Validators.required);
  dropPrivilege = new FormControl(null, Validators.required);
  reloadPrivilege = new FormControl(null, Validators.required);
  shutdownPrivilege = new FormControl(null, Validators.required);
  grantPrivilege = new FormControl(null, Validators.required);
  indexPrivilege = new FormControl(null, Validators.required);
  alterPrivilege = new FormControl(null, Validators.required);
  showDbPrivilege = new FormControl(null, Validators.required);
  executePrivilege = new FormControl(null, Validators.required);
  triggerPrivilege = new FormControl(null, Validators.required);
  dropRolePrivilege = new FormControl(null, Validators.required);
  createTablespacePrivilege = new FormControl(null, Validators.required);
  createRolePrivilege = new FormControl(null, Validators.required);
  createUserPrivilege = new FormControl(null, Validators.required);
  eventPrivilege = new FormControl(null, Validators.required);

  group = new FormArray([
    this.accountLocked,
    this.selectPrivilege,
    this.insertPrivilege,
    this.updatePrivilege,
    this.deletePrivilege,
    this.createPrivilege,
    this.dropPrivilege,
    this.reloadPrivilege,
    this.shutdownPrivilege,
    this.grantPrivilege,
    this.indexPrivilege,
    this.alterPrivilege,
    this.showDbPrivilege,
    this.executePrivilege,
    this.triggerPrivilege,
    this.dropRolePrivilege,
    this.createTablespacePrivilege,
    this.createRolePrivilege,
    this.createUserPrivilege,
    this.eventPrivilege,
  ]);

  labels = [
    'accountLocked',
    'selectPrivilege',
    'insertPrivilege',
    'updatePrivilege',
    'deletePrivilege',
    'createPrivilege',
    'dropPrivilege',
    'reloadPrivilege',
    'shutdownPrivilege',
    'grantPrivilege',
    'indexPrivilege',
    'alterPrivilege',
    'showDbPrivilege',
    'executePrivilege',
    'triggerPrivilege',
    'dropRolePrivilege',
    'createTablespacePrivilege',
    'createRolePrivilege',
    'createUserPrivilege',
    'eventPrivilege',
  ];

  get controls(): any {
    return this.group.controls;
  }

  label(n: number): string {
    return this.labels[n];
  }

  convertToModel(): DBUserData {
    const data = new DBUserData();
    data.host = this.host.value;
    data.username = this.username.value;
    data.lastPasswordChange = this.lastPasswordChange.value;
    data.accountLocked = this.accountLocked.value;
    data.selectPrivilege = this.selectPrivilege.value;
    data.insertPrivilege = this.insertPrivilege.value;
    data.updatePrivilege = this.updatePrivilege.value;
    data.deletePrivilege = this.deletePrivilege.value;
    data.createPrivilege = this.createPrivilege.value;
    data.dropPrivilege = this.dropPrivilege.value;
    data.reloadPrivilege = this.reloadPrivilege.value;
    data.shutdownPrivilege = this.shutdownPrivilege.value;
    data.grantPrivilege = this.grantPrivilege.value;
    data.indexPrivilege = this.indexPrivilege.value;
    data.alterPrivilege = this.alterPrivilege.value;
    data.showDbPrivilege = this.showDbPrivilege.value;
    data.executePrivilege = this.executePrivilege.value;
    data.triggerPrivilege = this.triggerPrivilege.value;
    data.dropRolePrivilege = this.dropRolePrivilege.value;
    data.createTablespacePrivilege = this.createTablespacePrivilege.value;
    data.createRolePrivilege = this.createRolePrivilege.value;
    data.createUserPrivilege = this.createUserPrivilege.value;
    data.eventPrivilege = this.eventPrivilege.value;
    return data;
  }

}
