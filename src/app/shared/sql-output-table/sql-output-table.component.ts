import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ColumnsAndRows} from '../../model/ColumnsAndRows';
import {ResponseMapper} from '../response-mapper';
import {SqlService} from '../../services/sql.service';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sql-output-table',
  templateUrl: './sql-output-table.component.html',
  styleUrls: ['./sql-output-table.component.scss']
})
export class SqlOutputTableComponent implements OnInit {
  @Input() outputData: any[];
  @Input() outputColumns: any[];
  @Input() columnsAndRows: ColumnsAndRows;
  @Output() rowClick: EventEmitter<any> = new EventEmitter();

  constructor(private sqlService: SqlService,
              private snack: MatSnackBar,
              private clipboard: Clipboard) { }

  ngOnInit(): void {
    // this.dataLoaded.subscribe(data => {
    //   if (data) {
    //     this.updateTableData();
    //   }
    // });
    this.updateTableData();
  }

  private updateTableData(): void {
    if (!!this.columnsAndRows && !!this.columnsAndRows.columns) {
      this.outputColumns = this.columnsAndRows.columns;
      this.outputData = ResponseMapper.remapAsObjectArray(this.columnsAndRows);
    }
  }

  onRowClick(row): void {
    this.rowClick.emit(row);
  }

  get dataLoaded(): Subject<boolean> {
    return this.sqlService.dataLoaded;
  }

  get isDataLoaded(): boolean {
    return (!!this.outputData && !!this.outputColumns)
      || (!!this.columnsAndRows && !!this.columnsAndRows.columns);
  }

  copyToClipboard(value: string): void {
    if (!!value) {
      this.clipboard.copy(value);
      this.snack.open('Value copied to clipboard');
    }
  }
}
