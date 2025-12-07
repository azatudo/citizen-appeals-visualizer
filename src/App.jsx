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
import Filters from "./components/Filters"; // твой компонент фильтров

export default function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const tableRefs = useRef({});

  // Загрузка данных
  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch(err => console.error("Ошибка загрузки данных:", err));
  }, []);

  // Скролл к выбранной строке
  useEffect(() => {
    if (selectedId != null && tableRefs.current[selectedId]) {
      tableRefs.current[selectedId].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedId]);

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
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "90vh", gap: 2, p: 2 }}>
      {/* Левая колонка: фильтры + таблица */}
      <Box sx={{ flex: 1, maxWidth: 450, display: "flex", flexDirection: "column", gap: 2 }}>
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
              {filteredItems.map(item => (
                <TableRow
                  key={item.id}
                  ref={el => (tableRefs.current[item.id] = el)}
                  hover
                  selected={selectedId === item.id}
                  onClick={() => handleRowClick(item)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.category || "Без категории"}</TableCell>
                  <TableCell>{item.address || "Адрес не указан"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Правая колонка: широкая карта */}
      <Box sx={{ flex: 3, minHeight: 500 }}>
        <MapView items={filteredItems} selectedId={selectedId} onMarkerClick={handleMarkerClick} />
      </Box>

      {/* Модалка */}
      <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, p: 4, outline: "none" }}>
          {modalItem && (
            <>
              <Typography id="modal-title" variant="h6" gutterBottom>
                #{modalItem.id} — {modalItem.category || "Без категории"}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2 }}>
                {modalItem.address || "Адрес не указан"}
              </Typography>
              <Typography sx={{ mb: 2 }}>{modalItem.description || "Описание отсутствует"}</Typography>
              <Button variant="contained" onClick={handleCloseModal}>Закрыть</Button>
            </>
          )}
        </Paper>
      </Modal>
    </Box>
  );
}