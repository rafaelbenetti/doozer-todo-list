export interface ITableColumn {
  field: string;
  header: string;
  type: TableColumnText;
}

export enum TableColumnText {
  Text = 'text',
  Date = 'date',
  Active = 'active',
}
