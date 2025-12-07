import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import PaginationComp from "./Pagination";
import { formatDate } from "../utils/helpers";

const PAGE_SIZE = 10;

export default function AppealsTable({ items, onRowClick }) {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(items.length / PAGE_SIZE) || 1;

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [page, items]);

  return (
    <Box>
      <TableContainer sx={{ maxHeight: "45vh" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageItems.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onRowClick(row)}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
              </TableRow>
            ))}

            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography>Нет данных</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationComp page={page} setPage={setPage} pageCount={pageCount} />
    </Box>
  );
}