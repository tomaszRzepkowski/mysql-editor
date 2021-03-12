import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SqlService} from '../services/sql.service';
import {InfoService} from '../services/info.service';
import {MatSelectChange} from '@angular/material/select';
import {BehaviorSubject} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-sql-editor',
  templateUrl: './sql-editor.component.html',
  styleUrls: ['./sql-editor.component.scss']
})
export class SqlEditorComponent implements OnInit {
  editorText = new FormControl('select * from users;');
  availableSchemas: string[];
  availableTables: string[];
  outputColumns: string[];
  outputData: object[];
  currentSchema: string;
  errorMessages: string = null;

  dataLoaded = new BehaviorSubject<boolean>(false);

  constructor(private sqlService: SqlService,
              private infoService: InfoService) { }

  ngOnInit(): void {
    this.infoService.getSchemas().subscribe((data) => {
      this.availableSchemas = data.rows.map(dbName => dbName[0]);
      // console.log(this.availableSchemas);
    });
  }

  /**
   * Executes query
   * @param $event
   */
  controlEnterPress(): void {
    const userEntry = this.editorText.value;
    this.sqlService.executeSQL(userEntry)
      .pipe(finalize(() => this.dataLoaded.next(true)))
      .pipe(catchError((err) => {
      this.dataLoaded.next(false);
      console.log(err.error.message);
      this.errorMessages = err.error.message;
      return err;
    })).subscribe((response) => {
      this.outputColumns = response.columns.slice();
      this.outputData = [];
      // for (let i = 0; i < response.columns.length; i++ ){
      //   const columnName = response.columns[i];
      //   console.log(columnName);
      //   for (const row of response.rows) {
      //     const rowElement = row[i];
      //     console.log(rowElement);
      //     obj[columnName] = rowElement;
      //   }
      //   this.outputData.push(obj);
      // }
      // console.log(obj);

      for (const row of response.rows) {
        const rowElement = row;
        const singleObject = {};
        for (let i = 0; i < rowElement.length; i++ ) {
          const columnName = response.columns[i];
          const columnValue = rowElement[i];
          console.log(response.columns[i]);
          console.log(rowElement[i]);
          singleObject[columnName] = columnValue;
        }
        this.outputData.push(singleObject);
        // console.log(rowElement);
        // obj[columnName] = rowElement;
      }
      console.log(this.outputColumns);
      console.log(this.outputData);
    });
  }

  selectSchema($event: MatSelectChange): void {
    console.log($event.value);
    const schemaName = $event.value;
    this.infoService.selectSchema(schemaName).subscribe(() => {
      console.log('Schema selected');
      this.currentSchema = schemaName;
      this.fetchTables(schemaName);
    });
  }

  private fetchTables(schemaName: string): void {
    this.infoService.getTables(schemaName).subscribe((data) => {
      console.log(data.rows);
      this.availableTables = data.rows;
    });
  }

  resetData(): void {
    this.outputColumns = null;
    this.outputData = null;
    this.errorMessages = null;
    this.dataLoaded.next(false);
  }
}
