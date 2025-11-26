"use client"
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Chips = () => {
  // 1. Inicializamos como array vacío [] para evitar errores de .length al principio
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/furgones');
        // 2. Agregamos await aquí porque .json() es asíncrono
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  // 3. Calculamos los valores filtrando el array Data
  const Total_Furgones = Data.length;
  const Furgones_Buenos = Data.filter((item) => item.estado === 'buena').length;
  const Furgones_Malos = Data.filter((item) => item.estado === 'mala').length;

  return (
    <Stack direction="row" spacing={2}>
      
      {/* TOTAL */}
      <Chip
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#1976d2", // azul
              }}
            />
            <Typography fontWeight="bold">
              Total: {Total_Furgones}
            </Typography>
          </Box>
        }
        sx={{ bgcolor: "#E3F2FD" }}
      />

      {/* BUENOS */}
      <Chip
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#2e7d32", // verde
              }}
            />
            <Typography fontWeight="bold">
              Buenos: {Furgones_Buenos}
            </Typography>
          </Box>
        }
        sx={{ bgcolor: "#E8F5E9" }}
      />

      {/* MALOS */}
      <Chip
        label={
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#c62828", // rojo
              }}
            />
            <Typography fontWeight="bold">
              Malos: {Furgones_Malos}
            </Typography>
          </Box>
        }
        sx={{ bgcolor: "#FFEBEE" }}
      />

    </Stack>
  );
};

export default Chips;