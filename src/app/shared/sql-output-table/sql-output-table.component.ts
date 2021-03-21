import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
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
    console.log(this.columnsAndRows);
    if (this.columnsAndRows) {
      this.outputColumns = this.columnsAndRows.columns;
      this.outputData = ResponseMapper.remapAsObjectArray(this.columnsAndRows);
    }
  }

}
