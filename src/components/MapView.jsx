import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Box, Typography, Button } from "@mui/material";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function MapView({ items, selectedId, onMarkerClick }) {
  const defaultCenter = [53.2194, 63.6226]; 

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {items.map((it) => (
          <Marker
            key={it.id}
            position={[it.latitude, it.longitude]}
            eventHandlers={{ click: () => onMarkerClick(it) }}
            opacity={selectedId === it.id ? 1 : 0.7}
          >
            <Popup>
              <Typography variant="subtitle2">
                #{it.id} — {it.category || "Без категории"}
              </Typography>
              <Typography variant="body2">{it.address || "Адрес не указан"}</Typography>
              <Button variant="outlined" size="small" onClick={() => onMarkerClick(it)}>
                Подробнее
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}