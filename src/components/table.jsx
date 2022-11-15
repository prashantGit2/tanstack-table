import React from "react";

import "./table.css";
import Data from "../data.json";
import {
  createColumnHelper,
  flexRender,
  ColumnResizeMode,
  getGroupedRowModel,
  getExpandedRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const defaultColumns = [
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        // footer: info => info.column.id,
      }),
      columnHelper.accessor((row) => row.email, {
        id: "email",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Email</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("phone", {
        header: () => <span>Phone</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("standard", {
        header: "Class",
        cell: (info) => (
          <span>{`${info.row.original.standard}-${info.row.original.section}`}</span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("date_of_birth", {
        header: "DOB",
        cell: (info) => <i>{info.getValue()}</i>,
        footer: (info) => info.column.id,
      }),
    ],
  }),
];

export default function Table() {
  const [data, setData] = React.useState(() => [...Data]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columns] = React.useState(() => [
    ...defaultColumns,
  ])
  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const [grouping, setGrouping] = React.useState([])
  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel:getGroupedRowModel(),
    getExpandedRowModel:getExpandedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      Prashant
      <select
        value={columnResizeMode}
        onChange={e => setColumnResizeMode(e.target.value)}
        className="border p-2 border-black rounded"
      >
        <option value="onEnd">Resize: "onEnd"</option>
        <option value="onChange">Resize: "onChange"</option>
      </select>
      
      <table
        className="styled-table"
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : (<div>
                        {header.column.getCanGroup() ? (
                          // If the header can be grouped, let's add a toggle
                          <button
                            {...{
                              onClick: header.column.getToggleGroupingHandler(),
                              style: {
                                cursor: 'pointer',
                              },
                            }}
                          >
                            {header.column.getIsGrouped()
                              ? `🛑(${header.column.getGroupedIndex()}) `
                              : `👊 `}
                          </button>
                        ) : null}{' '}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>)}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                        style: {
                          transform:
                            columnResizeMode === 'onEnd' &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  table.getState().columnSizingInfo.deltaOffset
                                }px)`
                              : '',
                        },
                      }}
                    />
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          
          {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                        background: cell.getIsGrouped()
                            ? '#0aff0082'
                            : cell.getIsAggregated()
                            ? '#ffa50078'
                            : cell.getIsPlaceholder()
                            ? '#ff000042'
                            : 'white',
                      },
                    }}
                  >
                    {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                    {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <button
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: {
                                cursor: row.getCanExpand()
                                  ? 'pointer'
                                  : 'normal',
                              },
                            }}
                          >
                            {row.getIsExpanded() ? '👇' : '👉'}{' '}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{' '}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
}

// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
