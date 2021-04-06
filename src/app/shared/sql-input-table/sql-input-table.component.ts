import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ResponseMapper} from '../response-mapper';
import {Pair} from '../../model/pair';
import {ColumnsAndRows} from '../../model/ColumnsAndRows';

@Component({
  selector: 'app-sql-input-table',
  templateUrl: './sql-input-table.component.html',
  styleUrls: ['./sql-input-table.component.scss']
})
export class SqlInputTableComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  formControls: FormControl[] = [];
  columnNames: string[] = [];
  datatypes = new Map<string, string>();
  @Input() columns: ColumnsAndRows;
  @Output() formSubmit = new EventEmitter<Pair[]>();

  constructor() { }

  ngOnInit(): void {
    const nameIndex = this.columns.columns.findIndex(col => col.toLowerCase().includes('field'));
    const typeIndex = this.columns.columns.findIndex(col => col.toLowerCase().includes('type'));
    this.columns.rows.forEach(col => {
      const name = col[nameIndex];
      const datatype = col[typeIndex];
      const control = new FormControl();
      this.columnNames.push(name);
      this.formGroup.addControl(name, control);
      this.datatypes.set(name, datatype);
    });
  }

  submitInsert(): void {
    const pairs = ResponseMapper.formControlToArray(this.formGroup.controls);
    this.formSubmit.emit(pairs);
  }
}
