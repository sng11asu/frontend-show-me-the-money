import {render} from '@testing-library/react';
import axios from 'axios';
import {MoneyTable} from './MoneyTable';
import {RowType} from '../../types/types';
import {describe, it, expect, beforeEach, vi} from 'vitest';
vi.mock('axios');
const mock = axios as jest.Mocked<typeof axios>;

describe('MoneyTable', () => {
  beforeEach(() => {});

  it('renders report name and date', async () => {
    const mockData = {
      Reports: [
        {
          ReportName: 'Test Report',
          ReportDate: '2023-01-01',
          ReportTitles: ['Title 1', 'Title 2'],
          Rows: [
            {
              RowType: RowType.Header,
              Cells: [{Value: 'Header 1'}, {Value: 'Header 2'}],
            },
            {
              RowType: RowType.Row,
              Cells: [{Value: 'Row 1 Cell 1'}, {Value: 'Row 1 Cell 2'}],
            },
            {
              RowType: RowType.SummaryRow,
              Cells: [{Value: 'Summary Cell 1'}, {Value: 'Summary Cell 2'}],
            },
          ],
        },
      ],
    };
    mock.get.mockResolvedValue({data: mockData});

    const {findByText} = render(<MoneyTable />);

    expect(await findByText('Report Name: Test Report')).toBeTruthy();
    expect(await findByText('Report Date: 2023-01-01')).toBeTruthy();
    expect(await findByText('Title 1')).toBeTruthy();
    expect(await findByText('Title 2')).toBeTruthy();
    expect(await findByText('Header 1')).toBeTruthy();
    expect(await findByText('Header 2')).toBeTruthy();
    expect(await findByText('Row 1 Cell 1')).toBeTruthy();
    expect(await findByText('Row 1 Cell 2')).toBeTruthy();
    expect(await findByText('Summary Cell 1')).toBeTruthy();
    expect(await findByText('Summary Cell 2')).toBeTruthy();
  });

  it('handles API error', async () => {
    mock.get.mockRejectedValue(new Error('API Error'));

    const {queryByText, findByText} = render(<MoneyTable />);

    await expect(findByText('Report Name:')).rejects.toThrow();
    await expect(findByText('Report Date:')).rejects.toThrow();
    expect(
      queryByText('Error occured while redering table data!')
    ).toBeTruthy();
  });
});
