"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import useGetListOfMentors from "~~/hooks/adminHooks/useGetListOfMentors";
import useRemoveMentor from "~~/hooks/adminHooks/useRemoveMentor";

/* eslint-disable @next/next/no-img-element */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

type tableDataType = {
  name: string;
  address: string;
};

const MentorLists = () => {
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  const columns = useMemo<ColumnDef<tableDataType>[]>(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "index",
        header: () => "S/N",
        cell: info => info.getValue(),
      },
      {
        accessorKey: "name",
        header: () => "Name",
        cell: info => info.getValue(),
      },
      {
        accessorKey: "address",
        header: () => "Address",
        cell: info => info.getValue(),
      },
      {
        id: "action",
        cell: ({ row }) => (
          <div className="px-1">
            <input
              type="checkbox"
              className="accent-color1"
              value={row.original.address}
              checked={selectedAddresses.includes(row.original.address)}
              onChange={() => handleCheckboxChange(row.original.address)}
            />
          </div>
        ),
        header: () => <span>Action</span>,
      },
    ],
    [selectedAddresses],
  );

  const handleCheckboxChange = (address: string) => {
    setSelectedAddresses(prevSelected =>
      prevSelected.includes(address) ? prevSelected.filter(addr => addr !== address) : [...prevSelected, address],
    );
  };

  const [data, _setData] = useState<tableDataType[]>([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
    },
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
  });

  // getting the list of mentors
  const list = useGetListOfMentors();

  useEffect(() => {
    if (list && list.length > 0) {
      _setData(list);
    }
  }, [list.length, list, _setData]);

  // For evicting students
  const { isConnected } = useAccount();
  const { removeMentors, isConfirming, isConfirmed } = useRemoveMentor(selectedAddresses);

  const handleMentorsRemoval = async () => {
    if (!isConnected) return toast.error("Please connect wallet", { position: "top-right" });
    if (selectedAddresses.length === 0)
      return toast.error("Please select rows to remove", {
        position: "top-right",
      });

    removeMentors();

    if (isConfirmed) setSelectedAddresses([]);
  };

  useEffect(() => {
    if (isConfirmed) setSelectedAddresses([]);
  }, [isConfirmed]);

  return (
    <section className="flex flex-col w-full py-6">
      <main className="flex flex-col w-full gap-4">
        <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:gap-0 md:items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold uppercase text-color2 md:text-2xl">Mentors List</h1>
            <h4 className="text-lg tracking-wider text-color2"> List of {data.length} mentors in your programme</h4>
            <p className="text-sm text-color2">
              To upload mentor&apos;s list,{" "}
              <Link href="/admin/fileupload" className=" text-color1 hover:underline">
                Click here
              </Link>
            </p>

            {/* Guidelines */}
            <div className="flex flex-col w-full mt-4 text-red-600">
              <h5 className="text-sm text-red-600">Guidelines</h5>
              <ol className="text-xs text-red-600 list-decimal list-inside">
                <li>
                  Upload mentor&apos;s list from here:{" "}
                  <Link href="/admin/fileupload" className="underline">
                    Upload.
                  </Link>
                </li>
                <li>The organisation creator is also a mentor</li>
                <li>Only the organisation creator can add/remove mentor</li>
                <li>You can search for any mentor using their address/name.</li>
                <li>Click on the checkboxes to select mentors to be removed.</li>
                <li>Click on the Remove button to evict the selected mentors.</li>
                <li>Removed mentors will be removed from the list and organisation.</li>
                <li className="font-semibold uppercase">Do not remove the organisation creator!</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="flex flex-col items-start justify-between w-full gap-2 mb-2 md:flex-row md:gap-0 md:items-center">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={setGlobalFilter}
              debounceTime={500}
              className="border py-2.5 px-3 rounded md:w-1/2 w-full caret-color1 outline-none border-color1 text-base bg-color1/5 text-color3"
              placeholder="Search all columns..."
            />
            {selectedAddresses.length > 0 && (
              <Button
                onClick={handleMentorsRemoval}
                disabled={isConfirming}
                className="border-none outline-none rounded px-3 bg-color1 hover:bg-color2 text-gray-200 py-1.5"
              >
                {selectedAddresses.length === 1 ? "Remove 1 mentor" : `Remove ${selectedAddresses.length} mentors`}
              </Button>
            )}
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow className="text-gray-300 bg-color2 hover:bg-color2" key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead className="w-[100px] font-semibold text-gray-300" key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell className="text-nowrap" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            className="px-3 py-1 text-gray-200 border rounded bg-color2"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            className="px-3 py-1 text-gray-200 border rounded bg-color2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            className="px-3 py-1 text-gray-200 border rounded bg-color2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            className="px-3 py-1 text-gray-200 border rounded bg-color2"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong className="text-color2">
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-10 p-1 text-sm border rounded outline-none caret-color1 border-color1 bg-color1/5 text-color3"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
            className="px-2 py-1 text-sm border rounded outline-none border-color1 bg-color1/5 text-color3"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </main>
    </section>
  );
};

export default MentorLists;

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounceTime = 500,
  className,
  ...inputProps
}: {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
  className?: string;
  placeholder?: string;
  inputProps?: any;
}) => {
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(debouncedValue);
    }, debounceTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue, onChange, debounceTime]);

  const handleInputChange = (event: any) => {
    setDebouncedValue(event.target.value);
  };

  return (
    <input
      {...inputProps}
      value={debouncedValue}
      onChange={handleInputChange}
      className={className}
      placeholder={inputProps.placeholder}
    />
  );
};
