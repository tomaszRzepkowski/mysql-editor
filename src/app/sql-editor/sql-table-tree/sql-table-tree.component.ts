import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {InfoService} from '../../services/info.service';
import {ActionParameters, TableActions} from '../../model/Actions';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SqlService} from '../../services/sql.service';
import {ColumnsAndRows} from '../../model/ColumnsAndRows';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Pair} from '../../model/pair';

@Component({
  selector: 'app-sql-table-tree',
  templateUrl: './sql-table-tree.component.html',
  styleUrls: ['./sql-table-tree.component.scss']
})
export class SqlTableTreeComponent implements OnInit {
  menuX = 0;
  menuY = 0;
  @Input() availableTables: string[];
  @Input() selectedSchema: string;
  @Input() selectedTable: string;
  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;
  @ViewChild('columnsDialog') columnsDialog: TemplateRef<any>;
  @ViewChild('triggersDialog') triggersDialog: TemplateRef<any>;
  @ViewChild('indexesDialog') indexesDialog: TemplateRef<any>;
  @ViewChild('proceduresDialog') proceduresDialog: TemplateRef<any>;
  @ViewChild('functionsDialog') functionsDialog: TemplateRef<any>;
  @ViewChild('viewsDialog') viewsDialog: TemplateRef<any>;
  @ViewChild('insertDialog') insertDialog: TemplateRef<any>;
  insertDialogRef: MatDialogRef<any>;
  @Output() executeSelect = new EventEmitter<ActionParameters>();
  columnsSource: ColumnsAndRows;
  triggerSource: ColumnsAndRows;
  indexesSource: ColumnsAndRows;
  viewsSource: ColumnsAndRows;
  proceduresSource: ColumnsAndRows;
  functionsSource: ColumnsAndRows;
  columnsForInsert: ColumnsAndRows;

  constructor(private infoService: InfoService,
              private sqlService: SqlService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // toggleMore(moreAboutTable: HTMLDivElement): void  {
  //   moreAboutTable.className === 'table-more collapsed' ? moreAboutTable.className = 'table-more expanded' : moreAboutTable.className = 'table-more collapsed';
  //   console.log(moreAboutTable.className);
  // }

  showColumnsForTable($event: MouseEvent): void  {
    this.infoService.getColumns(this.selectedSchema, this.selectedTable[0]).subscribe(data => {
      this.columnsSource = {...data};
      this.dialog.open(this.columnsDialog);
    });
  }

  showIndexesForTable($event: MouseEvent): void  {
    this.infoService.getIndexes(this.selectedSchema, this.selectedTable[0]).subscribe(data => {
      this.indexesSource = {...data};
      this.dialog.open(this.indexesDialog);
    });
  }

  showTriggersForTable($event: MouseEvent): void  {
    this.infoService.getTriggers(this.selectedSchema).subscribe(data => {
      this.triggerSource = {...data};
      this.dialog.open(this.triggersDialog);
    });
  }

  executeSelectTable($event: MouseEvent, limit?: number, orderBy?: string): void {
    const parameters = new ActionParameters();
    parameters.schema = this.selectedSchema;
    parameters.table = this.selectedTable;
    parameters.action = TableActions.SELECT;
    parameters.limit = limit ?? undefined;
    parameters.orderBy = orderBy ?? undefined;
    this.executeSelect.emit(parameters);
    this.menu.closeMenu();
  }

  handleAuxTableClick($event: MouseEvent, table: string): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.selectedTable = table;
    this.menuX = $event.clientX;
    this.menuY = $event.clientY;
    // console.log($event);
    // console.log(this.menuX);
    // console.log(this.menuY);
    this.menu.closeMenu();
    this.menu.openMenu();
  }

  prepareInsert($event: MouseEvent): void  {
    this.infoService.getColumns(this.selectedSchema, this.selectedTable[0]).subscribe(data => {
      this.columnsForInsert = data;
      this.dialog.open(this.insertDialog);
    });
  }

  executeInsert(pairs: Pair[]): void {
    this.sqlService.insertSQL(this.selectedSchema, this.selectedTable[0], pairs).subscribe(() => {
      this.snackBar.open('Insert successful');
      this.insertDialogRef.close();
    }, error => {
      this.snackBar.open(error.error.message, null, {panelClass: 'snack-error'});
    });
  }

  showViews($event: MouseEvent): void {
    console.log('views');
    this.infoService.getViews(this.selectedSchema).subscribe(data => {
      this.viewsSource = {...data};
      this.dialog.open(this.viewsDialog);
    });
  }

  showProcedures($event: MouseEvent): void {
    this.infoService.getProcedures(this.selectedSchema).subscribe(data => {
      this.proceduresSource = {...data};
      this.dialog.open(this.proceduresDialog);
    });

  }

  showFunctions($event: MouseEvent): void {
    this.infoService.getFunctions(this.selectedSchema).subscribe(data => {
      this.functionsSource = {...data};
      this.dialog.open(this.functionsDialog);
    });

  }
}
