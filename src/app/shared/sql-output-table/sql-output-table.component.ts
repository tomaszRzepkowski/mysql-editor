import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ColumnsAndRows} from '../../model/ColumnsAndRows';
import {ResponseMapper} from '../response-mapper';

@Component({
  selector: 'app-sql-output-table',
  templateUrl: './sql-output-table.component.html',
  styleUrls: ['./sql-output-table.component.scss']
})
export class SqlOutputTableComponent implements OnInit {
  @Input() outputData: any[];
  @Input() outputColumns: any[];
  @Input() columnsAndRows: ColumnsAndRows;
  @Input() dataLoaded: Subject<any>;
  @Output() rowClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.dataLoaded.subscribe(data => {
      if (data) {
        this.columnsAndRows = data;
        this.updateTableData();
      }
    });
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

}
