import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";

export default function PaginationComp({ page, setPage, pageCount }) {
  if (pageCount <= 1) return null;

  return (
    <Stack alignItems="center" mt={1}>
      <MuiPagination
        page={page}
        count={pageCount}
        onChange={(_, p) => setPage(p)}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "red", 
          },
          "& .Mui-selected": {
            backgroundColor: "black !important",
            color: "white !important",
          },
        }}
      />
    </Stack>
  );
}