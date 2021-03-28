import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConnectionService} from '../services/connection.service';
import {Connection} from '../model/connection';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage.service';
import {StorageKeysConstants} from '../shared/storage-keys.constants';

@Component({
  selector: 'app-db-connector',
  templateUrl: './db-connector.component.html',
  styleUrls: ['./db-connector.component.scss']
})
export class DbConnectorComponent implements OnInit {
  form = new ConnectionForm();

  constructor(private connectionService: ConnectionService,
              private storageService: StorageService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  fillTestConnectionData(): void {
    this.form.schema.setValue('information_schema');
    this.form.host.setValue('127.0.0.1');
    this.form.port.setValue(3306);
    this.form.username.setValue('editor');
    this.form.password.setValue('password');
  }

  tryToConnect(): void {
    const connection = new Connection();
    connection.schema = this.form.schema.value;
    connection.host = this.form.host.value;
    connection.port = this.form.port.value;
    connection.username = this.form.username.value;
    connection.password = this.form.password.value;
    this.storageService.storeInSession(StorageKeysConstants.CONNECTION_DATA, connection);
    this.connectionService.connectToDb(connection).subscribe((response) => {
      console.log(response);
      this.snackBar.open('Successfully connected to database');
      this.router.navigate(['sql']);
    }, (err) => {
      this.snackBar.open('Couldn\'t connect to the host');
    });
  }
}

class ConnectionForm {
  schema = new FormControl();
  host = new FormControl(null, Validators.required);
  port = new FormControl(null, Validators.required);
  username = new FormControl(null, Validators.required);
  password = new FormControl(null, Validators.required);
}
