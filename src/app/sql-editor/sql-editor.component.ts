import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SqlService} from '../services/sql.service';
import {InfoService} from '../services/info.service';
import {MatSelectChange} from '@angular/material/select';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {ResponseMapper} from '../shared/response-mapper';

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
    this.infoService.getSchemas().subscribe((data: ColumnsAndRows) => {
      this.availableSchemas = data.rows.map(dbName => dbName[0]);
    });

    this.infoService.getCurrentSchema().subscribe((data) => {
      this.currentSchema = data;
      console.log(this.currentSchema);
    });
  }

  /**
   * Executes query
   */
  controlEnterPress(): void {
    const userEntry = this.editorText.value;
    this.sqlService.executeSQL(userEntry)
      .pipe(finalize(() => this.dataLoaded.next(true)))
      .subscribe((response: ColumnsAndRows) => {
      this.outputColumns = response.columns.slice();
      this.outputData = ResponseMapper.remapAsObjectArray(response);
      console.log(this.outputColumns);
      console.log(this.outputData);
    }, (err) => {
        this.resetData();
        this.errorMessages = err.error.message;
        return [err.error.message];
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
    this.infoService.getTables(schemaName).subscribe((data: ColumnsAndRows) => {
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
