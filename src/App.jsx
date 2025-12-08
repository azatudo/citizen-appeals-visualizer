import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Typography,
  Button
} from "@mui/material";
import MapView from "./components/MapView";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const tableRefs = useRef({});

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      });
  }, []);

  useEffect(() => {
    if (selectedId != null && tableRefs.current[selectedId]) {
      tableRefs.current[selectedId].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [selectedId]);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const paginated = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleMarkerClick = (item) => {
    setModalItem(item);
    setModalOpen(true);
    setSelectedId(item.id);
  };

  const handleRowClick = (item) => {
    setSelectedId(item.id);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "90vh",
        gap: 2,
        p: 2
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxWidth: 450,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Filters data={items} onFilter={setFilteredItems} />
        </Paper>

        <TableContainer component={Paper} sx={{ flex: 1, overflowY: "auto" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Адрес</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map(item => (
                <TableRow
                  key={item.id}
                  ref={el => (tableRefs.current[item.id] = el)}
                  hover
                  selected={selectedId === item.id}
                  onClick={() => handleRowClick(item)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination page={page} setPage={setPage} pageCount={pageCount} />
      </Box>

      <Box sx={{ flex: 3, minHeight: 500 }}>
        <MapView
          items={filteredItems}
          selectedId={selectedId}
          onMarkerClick={handleMarkerClick}
        />
      </Box>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4
          }}
        >
          {modalItem && (
            <>
              <Typography variant="h6">
                #{modalItem.id} — {modalItem.category}
              </Typography>
              <Typography sx={{ mb: 2 }}>{modalItem.address}</Typography>
              <Typography sx={{ mb: 2 }}>{modalItem.description}</Typography>
              <Button variant="contained" onClick={handleCloseModal}>
                Закрыть
              </Button>
            </>
          )}
        </Paper>
      </Modal>
    </Box>
  );
}