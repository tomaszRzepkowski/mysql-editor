import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ConnectionService} from '../services/connection.service';
import {Connection} from '../model/connection';

@Component({
  selector: 'app-db-connector',
  templateUrl: './db-connector.component.html',
  styleUrls: ['./db-connector.component.scss']
})
export class DbConnectorComponent implements OnInit {
  form = new ConnectionForm();

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    console.error('DODAJ ZARZĄDZANIE UŻYTKOWNIKAMI ROLAMI GRANTSY ITD');
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
    this.connectionService.connectToDb(connection).subscribe((response) => {
      console.log(response);
    });
  }
}

class ConnectionForm {
  schema = new FormControl();
  host = new FormControl();
  port = new FormControl();
  username = new FormControl();
  password = new FormControl();
}
