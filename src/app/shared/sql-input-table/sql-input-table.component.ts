import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ResponseMapper} from '../response-mapper';
import {Pair} from '../../model/pair';

@Component({
  selector: 'app-sql-input-table',
  templateUrl: './sql-input-table.component.html',
  styleUrls: ['./sql-input-table.component.scss']
})
export class SqlInputTableComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  formControls: FormControl[] = [];
  @Input() columns: string[];
  @Output() formSubmit = new EventEmitter<Pair[]>();

  constructor() { }

  ngOnInit(): void {
    this.columns.map(col => {
      const control = new FormControl();
      this.formGroup.addControl(col, control);
    });
  }

  submitInsert(): void {
    const pairs = ResponseMapper.formControlToArray(this.formGroup.controls);
    this.formSubmit.emit(pairs);
  }
}
