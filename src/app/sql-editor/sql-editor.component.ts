import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SqlService} from '../services/sql.service';
import {InfoService} from '../services/info.service';
import {MatSelectChange} from '@angular/material/select';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {ResponseMapper} from '../shared/response-mapper';
import {ActionParameters, ActionResponse, TableActions} from '../model/Actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';

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
  selectedSchema: string;
  selectedTable: string;
  errorMessages: string = null;
  menuX = 0;
  menuY = 0;
  dataLoaded = new BehaviorSubject<boolean>(false);

  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;

  constructor(private sqlService: SqlService,
              private snackBar: MatSnackBar,
              private infoService: InfoService) { }

  ngOnInit(): void {
    this.infoService.getSchemas().subscribe((data: ColumnsAndRows) => {
      this.availableSchemas = data.rows.map(dbName => dbName[0]);
    });

    this.infoService.getCurrentSchema().subscribe((data) => {
      this.selectedSchema = data;
      console.log(this.selectedSchema);
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
        this.resolveData(response);
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
      this.selectedSchema = schemaName;
      this.fetchTables(schemaName);
    });
  }

  private resolveData(response: ColumnsAndRows): void {
    this.outputColumns = response.columns.slice();
    this.outputData = ResponseMapper.remapAsObjectArray(response);
    console.log(this.outputColumns);
    console.log(this.outputData);
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

  handleAuxTableClick($event: MouseEvent, table: string): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.selectedTable = table;
    this.menuX = $event.x;
    this.menuY = $event.y;
    this.menu.closeMenu();
    this.menu.openMenu();
  }

  executeSelectTable($event: MouseEvent, limit?: number, orderBy?: string): void {
    const parameters = new ActionParameters();
    parameters.schema = this.selectedSchema;
    parameters.table = this.selectedTable;
    parameters.action = TableActions.SELECT;
    parameters.limit = limit ?? undefined;
    parameters.orderBy = orderBy ?? undefined;
    this.sqlService.executeSQLAction(parameters)
      .pipe(finalize(() => this.dataLoaded.next(true)))
      .subscribe((response: ActionResponse) => {
        this.resolveData(response.columnsAndRows);
        this.setEditorText(response.sql);
        this.snackBar.open('Success');
      }, error => {
        this.snackBar.open('', null, {panelClass: 'snack-error'});
    });
    this.menu.closeMenu();
  }

  handleSelectTable($event: MouseEvent, table: string): void {
    // const parameters = new ActionParameters();
    // parameters.schema = this.currentSchema;
    // parameters.table = table;
    // parameters.action = TableActions.SELECT;
    // this.sqlService.prepareSQLForAction(parameters)
    //   .pipe(finalize(() => this.dataLoaded.next(true)))
    //   .subscribe((response: ActionResponse) => {
    //   this.snackBar.open('Success');
    //   console.log(response);
    //   this.resolveData(response.columnsAndRows);
    //   this.editorText.setValue(response.sql);
    // }, error => {
    //   this.snackBar.open('', null, {panelClass: 'snack-error'});
    // });
  }

  private setEditorText(newValue: string): void {
    this.editorText.setValue(newValue);
  }

  prepareInsert($event: MouseEvent): void {
    console.log();
  }
}
