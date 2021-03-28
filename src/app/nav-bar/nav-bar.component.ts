import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import {Connection} from '../model/connection';
import {StorageService} from '../services/storage.service';
import {StorageKeysConstants} from '../shared/storage-keys.constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private connectionService: ConnectionService,
              private snackBar: MatSnackBar,
              private router: Router,
              private storageService: StorageService) { }

  ngOnInit(): void {
  }

  autoConnect(): void {
    const connection = this.storageService.getFromSession<Connection>(StorageKeysConstants.CONNECTION_DATA);
    if (!connection) {
      this.snackBar.open('There are no saved connection parameters');
      return;
    }
    this.connectionService.connectToDb(connection).subscribe((response) => {
      console.log(response);
      this.snackBar.open('Successfully connected to database');
      this.router.navigate(['sql']);
    }, (err) => {
      this.snackBar.open('Couldn\'t connect to the host');
    });
  }

  get canAutoConnect(): boolean {
    return !this.storageService.getFromSession<Connection>(StorageKeysConstants.CONNECTION_DATA);
  }
}
