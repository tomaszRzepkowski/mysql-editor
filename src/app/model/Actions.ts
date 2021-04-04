import {ColumnsAndRows} from './ColumnsAndRows';

export class ActionParameters {
  schema: string;
  table: string;
  action: TableActions;
  limit?: number;
  orderBy?: string;
}

export class ActionResponse {
  columnsAndRows: ColumnsAndRows;
  sql: string;
}

export enum TableActions {
  SELECT = 'SELECT'
}
