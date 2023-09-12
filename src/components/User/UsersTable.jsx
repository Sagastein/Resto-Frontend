

import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TextInput,
  Divider,
} from "@tremor/react";
import { BsSearch, BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { data, error, isLoading } = useSWR("/api/users", fetcher);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid justify-center items-center text-4xl">
        <p className="animate-pulse">Error connecting to the server</p>
      </div>
    );
  }

  const filteredData = data.filter((item) =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const columns = [
    { key: "UserId", header: "User ID", width: "80px" },
    { key: "fullName", header: "Full Name", width: "auto" },
    { key: "email", header: "Email", width: "auto" },
    { key: "tel", header: "Phone", width: "auto" },
    { key: "gender", header: "Gender", width: "auto" },
    { key: "createdAt", header: "Created", width: "auto" },
  ];

  const firstIndex = currentPage * pageSize + 1;
  const lastIndex = Math.min((currentPage + 1) * pageSize, filteredData.length);

  const sa = (userId) => {
    console.log("params", userId);
    if (userId === undefined) return navigate('/admin/users',{replace:true});
    // navigate(`/profile/${userId}`);
    navigate(`/admin/profile/${userId}/`);
  };

  return (
    <>
      <Card className="mb-4">
        <TextInput
          icon={BsSearch}
          type="text"
          placeholder="Search by full name"
          className="border  border-gray-300 rounded w-10/12"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Card>
      <Card className="mb-4">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row) => (
              <TableRow className="hover:bg-gray-200 cursor-pointer" onClick={() => sa(row.UserId)} key={row.UserId}>
                {columns.map((column) => (
                  <TableCell
                    key={`${row.userId}-${column.key}`}
                    className="px-6 capitalize py-4 whitespace-nowrap"
                  >
                    {row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <div className="flex gap-6  my-4 justify-end items-center">
          <code className="mx-2 capitalize">
            {firstIndex}-{lastIndex} <strong className="text-xl">/</strong>{" "}
            {filteredData.length}
          </code>
          <button
            className={`px-4  disabled:text-gray-600 disabled:cursor-none rounded-md py-2 focus:outline-none ${
              currentPage === 0 ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <BsChevronLeft className="text-xl font-extrabold" />
          </button>

          <button
            className={`px-4 py-2 disabled:text-gray-600 disabled:cursor-none rounded-md focus:outline-none ${
              currentPage === pageCount - 1 ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            <BsChevronRight className="text-xl" />
          </button>
        </div>
      </Card>
    </>
  );
};

export default UsersTable;

  
