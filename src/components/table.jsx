import React from "react";

import "./table.css";
import Data from "../data.json";
import {
  createColumnHelper,
  flexRender,
  ColumnResizeMode,
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
        cell: (info) => <i>{info.getValue().slice(0, 10)}</i>,
        footer: (info) => info.column.id,
      }),
    ],
  }),

  // columnHelper.group({
  //   header: 'Address',
  //   footer: props => props.column.id,
  //   columns: [
  //     // Accessor Column
  //     columnHelper.accessor('pincode', {
  //       cell: info => info.cell.row.original.address.pincode,
  //       footer: props => props.column.id,
  //     }),
  //     // Accessor Column
  //     columnHelper.accessor(row => row.lastName, {
  //       id: 'city',
  //       cell: info => info.cell.row.original.address.city,
  //       footer: props => props.column.id,
  //     }),
  //   ],
  // }),
];

export default function App() {
  const [data, setData] = React.useState(() => [...Data]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columns] = React.useState(() => [
    ...defaultColumns,
  ])
  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      <select
        value={columnResizeMode}
        onChange={e => setColumnResizeMode(e.target.value)}
        className="border p-2 border-black rounded"
      >
        <option value="onEnd">Resize: "onEnd"</option>
        <option value="onChange">Resize: "onChange"</option>
      </select>
      {/* <div className="overflow-x-auto">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
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
                // <th
                //   {...{
                //     key: header.id,
                //     colSpan: header.colSpan,
                //     style: {
                //       width: header.getSize(),
                //     },
                //   }}
                // >
                //   {header.isPlaceholder
                //     ? null
                //     : flexRender(
                //         header.column.columnDef.header,
                //         header.getContext()
                //       )}
                //   <div
                //     {...{
                //       onMouseDown: header.getResizeHandler(),
                //       onTouchStart: header.getResizeHandler(),
                //       className: `resizer ${
                //         header.column.getIsResizing() ? "isResizing" : ""
                //       }`,
                //       style: {
                //         transform:
                //           columnResizeMode === "onEnd" &&
                //           header.column.getIsResizing()
                //             ? `translateX(${
                //                 table.getState().columnSizingInfo.deltaOffset
                //               }px)`
                //             : "",
                //       },
                //     }}
                //   />
                // </th>
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
          {/* {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))} */}
          {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
