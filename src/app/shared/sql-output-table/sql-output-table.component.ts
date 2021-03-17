import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataAndRows} from '../../model/DataAndRows';

@Component({
  selector: 'app-sql-output-table',
  templateUrl: './sql-output-table.component.html',
  styleUrls: ['./sql-output-table.component.scss']
})
export class SqlOutputTableComponent implements OnInit {
  @Input() outputData: any[];
  @Input() outputColumns: any[];
  @Input() dataAndRows: DataAndRows;
  @Input() dataLoaded: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.dataAndRows);
    console.log(this.outputColumns);
    console.log(this.outputData);
    if (this.dataAndRows) {
      this.outputData = this.dataAndRows.rows;
      this.outputColumns = this.dataAndRows.columns;
    }
  }

}
