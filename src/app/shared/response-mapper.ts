import {ColumnsAndRows} from '../model/ColumnsAndRows';

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
}
