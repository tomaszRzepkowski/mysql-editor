import {ColumnsAndRows} from '../model/ColumnsAndRows';
import {Pair} from '../model/pair';
import {FormControl} from '@angular/forms';

export class ResponseMapper {
  static remapAsObjectArray(response: ColumnsAndRows): object[] {
    const resultData: object[] = [];
    for (const row of response.rows) {
      const rowElement = row;
      const singleObject = {};
      for (let i = 0; i < rowElement.length; i++) {
        const columnName = response.columns[i];
        const columnValue = rowElement[i];
        // console.log(response.columns[i]);
        // console.log(rowElement[i]);
        singleObject[columnName] = columnValue;
      }
      resultData.push(singleObject);
    }
    return resultData;
  }

  static objectToArray(obj: object): Pair[] {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const result: Pair[] = [];
    for (let i = 0; i < keys.length; i++) {
      result.push(new Pair(keys[i], values[i]));
    }
    return result;
  }

  static formControlToArray(obj: object): Pair[] {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const result: Pair[] = [];
    for (let i = 0; i < keys.length; i++) {
      const val = values[i] as FormControl;
      result.push(new Pair(keys[i], val.value));
    }
    return result;
  }
}
