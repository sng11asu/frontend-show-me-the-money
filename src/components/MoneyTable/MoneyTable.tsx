import axios from 'axios';
import {useEffect, useState} from 'react';
import './moneyTable.css';
import {Data, Row, Cell, RowType} from '../../types/types';

export const MoneyTable = () => {
  const [data, setData] = useState<Data>();
  const [rows, setRows] = useState<Row[]>([]);
  const getData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3100/api/data');
      setData(response.data);
      setRows(response.data.Reports[0].Rows);
      console.log('Data', response.data);
    } catch (err) {
      console.log('Error calling the API', err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleRows: any = (rows: Row[]) => {
    let columns = 0;
    return rows.map((row: Row, ind: number) => {
      if (row.RowType === RowType.Header) {
        columns = row.Cells.length;
        return (
          <tr key={'tr' + ind + Math.random()}>
            {row.Cells?.map((cell: Cell, ind: number) => {
              return <th key={'th' + ind + Math.random()}>{cell.Value}</th>;
            })}
          </tr>
        );
      } else if (
        row.RowType === RowType.Row ||
        row.RowType === RowType.SummaryRow
      ) {
        return (
          <tr
            key={'tr' + ind + Math.random()}
            className={
              row.RowType === RowType.SummaryRow ? 'summary-row' : 'row'
            }
          >
            {row.Cells.map((cell: Cell, ind: number) => (
              <td key={'td' + ind + Math.random()}>{cell.Value}</td>
            ))}
          </tr>
        );
      } else if (row.RowType === RowType.Section) {
        return (
          <>
            <tr key={'tr' + ind + Math.random()}>
              <th key={'th' + ind + Math.random()} colSpan={columns}>
                {row.Title}
              </th>
            </tr>
            {row.Rows?.length ? (
              handleRows(row.Rows)
            ) : (
              <tr key={'tr' + ind + Math.random()}>
                <td key={'td' + ind + Math.random()} colSpan={columns}></td>
              </tr>
            )}
          </>
        );
      }
    });
  };

  return (
    <>
      {data ? (
        <>
          <div className="d-flex">
            <p> Report Name: {data?.Reports[0].ReportName} </p>
            <p>Report Date: {data?.Reports[0].ReportDate} </p>
          </div>
          <div className="d-flex">
            {data?.Reports[0].ReportTitles.map((title: string, ind: number) => (
              <p key={'title' + ind + Math.random()}>{title} </p>
            ))}
          </div>
          <table>
            <tbody>{handleRows(rows)}</tbody>
          </table>
        </>
      ) : (
        <>
          <h4>Error occured while redering table data!</h4>
        </>
      )}
    </>
  );
};
