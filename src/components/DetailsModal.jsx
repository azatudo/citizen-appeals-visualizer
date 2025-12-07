import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DetailsModal({ item, onClose }) {
  if (!item) return null;

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Обращение #{item.id}</DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle2">Категория</Typography>
        <Typography mb={2}>{item.category}</Typography>

        <Typography variant="subtitle2">Адрес</Typography>
        <Typography mb={2}>{item.address}</Typography>

        <Typography variant="subtitle2">Статус</Typography>
        <Typography mb={2}>{item.status}</Typography>

        <Typography variant="subtitle2">Дата регистрации</Typography>
        <Typography mb={2}>{item.created_at}</Typography>

        <Typography variant="subtitle2">Описание</Typography>
        <Typography mb={2}>{item.description}</Typography>

        <Typography variant="subtitle2">Координаты</Typography>
        <Typography>{item.latitude}, {item.longitude}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
}