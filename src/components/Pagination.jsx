import React from "react";
import { Pagination, Stack } from "@mui/material";

export default function PaginationComp({ page, setPage, pageCount }) {
  if (pageCount <= 1) return null;

  return (
    <Stack alignItems="center" mt={1}>
      <Pagination
        page={page}
        count={pageCount}
        onChange={(_, p) => setPage(p)}
      />
    </Stack>
  );
}