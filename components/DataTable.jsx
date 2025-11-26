'use client'

import { useState, useMemo } from "react"; // 1. Quitamos useEffect
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, IconButton, Tooltip, Box, Select, MenuItem, FormControl, InputLabel,
  TextField, TablePagination, InputAdornment
} from "@mui/material";

import { FaEdit, FaSearch } from "react-icons/fa";
import { GoContainer } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useRouter } from "next/navigation";
import Chips from "./Chips";

const ROWS_PER_PAGE = 5;

const DataTable = ({ Data }) => {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [page, setPage] = useState(0);

  // 🔵 FILTRADO REAL
  const filteredData = useMemo(() => {
    let list = [...Data];

    if (filterEstado !== 'todos') {
      list = list.filter(row => row.estado === filterEstado);
    }

    if (searchQuery.trim() !== "") {
      list = list.filter(row =>
        row.placa.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return list;
  }, [Data, filterEstado, searchQuery]);

  // 🔵 PAGINACIÓN
  const paginatedData = useMemo(() => {
    const start = page * ROWS_PER_PAGE;
    return filteredData.slice(start, start + ROWS_PER_PAGE);
  }, [filteredData, page]);

  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 0, width: '100%' }}>
      
      {/* 🔵 FILTROS */}
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        
        <TextField
          label="Buscar por Placa"
          size="small"
          value={searchQuery}
          // ✅ CORRECCIÓN 1: Reseteamos la página aquí mismo
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0); 
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch size={15} color="gray" />
              </InputAdornment>
            )
          }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={filterEstado}
            label="Estado"
            // ✅ CORRECCIÓN 2: Reseteamos la página aquí mismo
            onChange={(e) => {
              setFilterEstado(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="buena">Buena</MenuItem>
            <MenuItem value="mala">Mala</MenuItem>
          </Select>
        </FormControl>

        <Box
          width={'100%'}
          margin={"auto"}
          padding={'5px'}
          display={{xs:"flex", sm:"flex", md:"none"}}
        >
          <Chips/>
        </Box>

      </Box>

      {/* 🔵 TABLA */}
      <Table>
        <TableHead sx={{ bgcolor: '#1976d2' }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>
              <Box display="flex" gap={1} alignItems="center">
                <GoContainer /> <strong>Placa</strong>
              </Box>
            </TableCell>

            <TableCell sx={{ color: "white" }} align="center">
              <Box display="flex" gap={1} alignItems="center">
                <IoAlertCircleOutline /> <strong>Estado</strong>
              </Box>
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              <Box display="flex" gap={1} alignItems="center">
                <MdOutlineDescription /> <strong>Descripción</strong>
              </Box>
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              <Box display="flex" gap={1} alignItems="center">
                <FaRegCalendarAlt /> <strong>Fecha</strong>
              </Box>
            </TableCell>

            <TableCell sx={{ color: "white" }} align="center">
              <Box display="flex" gap={1} alignItems="center">
                <SlOptionsVertical /> <strong>Acciones</strong>
              </Box>
            </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <TableRow key={row.id}>

                <TableCell>{row.placa}</TableCell>

                <TableCell align="center">
                  <Chip
                    label={row.estado.toUpperCase()}
                    sx={{
                      backgroundColor: row.estado === "buena" ? "#e8f5e9" : "#ffebee",
                      color: row.estado === "buena" ? "#388e3c" : "#d32f2f"
                    }}
                  />
                </TableCell>

                <TableCell>
                  {row.estado === "mala"
                    ? <span style={{ color: "#d32f2f" }}>{row.falla}</span>
                    : <span style={{ color: "#9e9e9e" }}>- Sin fallas -</span>
                  }
                </TableCell>

                <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => router.push(`/furgon/editar/${row.id}`)}>
                      <FaEdit size={18} />
                    </IconButton>
                  </Tooltip>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 🔵 Paginación */}
      <TablePagination
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        component="div"
        count={filteredData.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
      />

    </TableContainer>
  );
};

export default DataTable;