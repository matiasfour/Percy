"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { TypeOnSelectionChangeArg } from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
import Image from "next/image";
import { TypePaginationProps } from "@inovua/reactdatagrid-community/types";
import "./styles.css";
import { Columns } from "./types";

const gridStyle = {
  minHeight: 550,
  backgroundColor: "#F8F9FB",
  borderRadius: 10,
};

interface DatagridProps {
  data: any;
  searchParam: string | null;
  columns: any;
  signalType?: string;
  disableRowClick?: boolean;
  onRowSelection?: (data: TypeOnSelectionChangeArg) => void; 
  setSortByColumns?: Dispatch<SetStateAction<any>>
  sortByColumns?: any;
}

function getDisplayedPageIndexes(totalPages: number, currentPage: number) {
  const MAX_DISPLAYED_PAGES = 5;
  const indexes = [];

  if (totalPages <= MAX_DISPLAYED_PAGES) {
    for (let i = 0; i < totalPages; i++) {
      indexes.push(i);
    }
  } else if (currentPage < MAX_DISPLAYED_PAGES - 2) {
    for (let i = 0; i < MAX_DISPLAYED_PAGES - 1; i++) {
      indexes.push(i);
    }
    indexes.push(-1);
    indexes.push(totalPages - 1);
  } else if (currentPage > totalPages - (MAX_DISPLAYED_PAGES - 3)) {
    indexes.push(0);
    indexes.push(-1);
    for (let i = totalPages - (MAX_DISPLAYED_PAGES - 1); i < totalPages; i++) {
      indexes.push(i);
    }
  } else {
    indexes.push(0);
    indexes.push(-1);
    for (let i = currentPage - 1; i < currentPage + 2; i++) {
      indexes.push(i);
    }
    indexes.push(-1);
    indexes.push(totalPages - 1);
  }
  return indexes;
}

export default function Datagrid({
  data,
  columns,
  disableRowClick = false,
  sortByColumns,
  onRowSelection,
  setSortByColumns
}: DatagridProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const sortColumns = (sortInfo: any) => {
    if(setSortByColumns && sortByColumns) {
      setSortByColumns({[sortInfo?.name]: sortInfo?.dir === 1 ? 'asc' : 'desc' })
    }
  }

  const onRowSelectionChange = (data: TypeOnSelectionChangeArg) => {
    if(disableRowClick) return;
    onRowSelection?.(data);
  }

  const CustomPagination = ({
    count,
    limit,
    gotoPage,
  }: TypePaginationProps) => {
    const displayedPages = getDisplayedPageIndexes(
      Math.ceil(count / limit),
      currentPage
    );

    return (
      <div className="custom-pagination">
        <button
          className="button"
          onClick={() => {
            setCurrentPage(currentPage - 1);
            gotoPage(currentPage);
          }}
        >
          <Image
            alt={"collapse/expand icon"}
            width={10}
            height={10}
            src={"/light-arrow-right.svg"}
          />
          <span>Prev</span>
        </button>
        <div className="button-pages">
          {displayedPages.map((pageIndex, index) => (
            <React.Fragment key={index}>
              {pageIndex === -1 ? (
                <span>...</span>
              ) : (
                <button
                  className={pageIndex === currentPage ? "active" : "button"}
                  onClick={() => {
                    setCurrentPage(pageIndex);
                    gotoPage(pageIndex + 1);
                  }}
                >
                  {pageIndex + 1}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
        <button
          className="button"
          onClick={() => {
            setCurrentPage(currentPage + 1);
            gotoPage(currentPage + 2);
          }}
        >
          <span>Next</span>
          <Image
            alt={"collapse/expand icon"}
            width={10}
            height={10}
            src={"/light-arrow-right.svg"}
          />
        </button>
      </div>
    );
  };

  return (
    <ReactDataGrid
      idProperty="id"
      columns={columns}
      dataSource={data}
      style={gridStyle}
      toggleRowSelectOnClick={true}
      enableSelection={true}
      onSelectionChange={onRowSelectionChange}
      pagination
      limit={10}
      renderPaginationToolbar={CustomPagination}
      rowStyle={{
        borderBottom: "1px solid #D1D9E2",
        backgroundColor: "#F8F9FB",
        boxSizing: "border-box",
        borderRadius: 10,
      }}
      onSortInfoChange={sortColumns}
    />
  );
}
