export enum RowType {
  Section = 'Section',
  Header = 'Header',
  SummaryRow = 'SummaryRow',
  Row = 'Row',
}
interface Cell {
  Value: string;
  Attributes?: {
    Value: string;
    Id: string;
  }[];
}
interface Row {
  RowType: RowType;
  Title?: String;
  Cells: Cell[];
  Rows?: Row[];
}
interface Report {
  Fields: [];
  ReportDate: string;
  ReportID: string;
  ReportName: string;
  ReportTitles: string[];
  ReportType: string;
  UpdatedDateUTC: string;
  Rows: Row[];
}

interface Data {
  Reports: Report[];
  status: string;
}

export type {Data, Report, Row, Cell};
