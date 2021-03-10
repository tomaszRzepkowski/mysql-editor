import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SqlService} from '../services/sql.service';
import {InfoService} from '../services/info.service';

@Component({
  selector: 'app-sql-editor',
  templateUrl: './sql-editor.component.html',
  styleUrls: ['./sql-editor.component.scss']
})
export class SqlEditorComponent implements OnInit {
  editorText = new FormControl(null);
  availableSchmas: string[];

  constructor(private sqlService: SqlService,
              private infoService: InfoService) { }

  ngOnInit(): void {
    this.infoService.getSchemas().subscribe((data) => {
      this.availableSchmas = data;
      console.log(data.columns);
      console.log(data.rows);
      const entries = new Map([
        data.columns,
        data.rows
      ]);
      const test = Object.fromEntries(entries);
      console.log(test);
    });
  }

  /**
   * Executes query
   * @param $event
   */
  controlEnterPress($event: any): void {
    // console.log('Control enter');
    // console.log(this.editorText.value);
    // console.log(this.editorText.value.toString());
    // console.log(this.editorText.value.toString().trim());
    const userEntry = this.editorText.value;
    this.sqlService.executeSQL(userEntry).subscribe((response) => {
      console.log(response);
    });
  }
}
