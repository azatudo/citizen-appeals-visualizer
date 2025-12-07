import React, { useState, useMemo } from "react";
import { TextField, MenuItem, Stack, Button } from "@mui/material";

const STATUS = ["Все", "В работе", "Решено", "Отклонено"];

export default function Filters({ data, onFilter }) {
  const [status, setStatus] = useState("Все");
  const [category, setCategory] = useState("Все");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(data.map((d) => d.category));
    return ["Все", ...set];
  }, [data]);

  function apply() {
    let res = [...data];

    if (status !== "Все") {
      res = res.filter((x) => x.status === status);
    }

    if (category !== "Все") {
      res = res.filter((x) => x.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      res = res.filter(
        (x) =>
          x.category.toLowerCase().includes(q) ||
          x.address.toLowerCase().includes(q)
      );
    }

    onFilter(res);
  }

  return (
    <Stack spacing={1} mb={2}>
      <TextField
        select
        label="Статус"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {STATUS.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Поиск по категории или адресу"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && apply()}
      />

      <Button variant="contained" onClick={apply}>
        Применить
      </Button>
    </Stack>
  );
}