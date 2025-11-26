'use client'

import React, { useState } from 'react'
import { 
  Box, TextField, Button, Radio, RadioGroup, FormControlLabel, 
  FormControl, FormLabel, Stack, Paper, InputAdornment, Snackbar, Alert 
} from '@mui/material'
import { FaSave, FaTruck, FaExclamationTriangle } from "react-icons/fa";

const FormAdd = () => {
  // Estado inicial de los datos
  const initialData = {
    placa: '',
    estado: 'buena',
    falla: '',
  }

  const [Data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState({ open: false, text: '', type: 'success' })

  // Manejador de cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target
    
    setData((prevData) => ({    
        ...prevData,
        [name]: value,
        // Si cambia a "buena", limpiamos la falla automáticamente
        ...(name === 'estado' && value === 'buena' ? { falla: '' } : {})
    }))
  }

  // Manejador de envío
  const handleSubmit = async(event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/furgones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      })

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error en la respuesta del servidor');
      }

      // ÉXITO:
      console.log('Furgón agregado:', result);
      setMensaje({ open: true, text: 'Furgón guardado correctamente', type: 'success' })
      window.location.reload();
      
      // Limpiamos el formulario reseteando el estado
      setData(initialData)

      // Opcional: Aquí podrías disparar un evento para recargar la tabla automáticamente

    } catch (error) {
      console.error('Error al agregar furgón:', error);
      setMensaje({ open: true, text: error.message || 'Error de conexión', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    // CORRECCIÓN DE DISEÑO: width: '100%' para que llene la columna del Grid
    <Paper sx={{ p: 4, width: '100%'}}>
      {/* Alerta flotante (Feedback) */}
      <Snackbar 
        open={mensaje.open} 
        autoHideDuration={4000} 
        onClose={() => setMensaje({ ...mensaje, open: false })}
      >
        <Alert severity={mensaje.type} variant="filled">
          {mensaje.text}
        </Alert>
      </Snackbar>

      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          
          <TextField 
            label="Número de Placa" 
            variant="outlined" 
            name="placa"
            fullWidth 
            required
            // CORRECCIÓN CRÍTICA: Vinculamos el value al estado para poder limpiarlo
            value={Data.placa} 
            onChange={handleChange} 
            placeholder="Ej: HN-1234"
            disabled={loading}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaTruck size={20} color="gray" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl>
            <FormLabel id="radio-buttons-group-estado">Estado de la unidad</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-estado"
              name="estado"
              value={Data.estado} 
              onChange={handleChange}
            >
              <FormControlLabel 
                value="buena" 
                control={<Radio color="success" />} 
                label="Buena" 
                disabled={loading}
              />
              <FormControlLabel 
                value="mala" 
                control={<Radio color="error" />} 
                label="Mala" 
                disabled={loading}
              />
            </RadioGroup>
          </FormControl>

          {Data.estado === 'mala' && (
            <TextField
              label="Descripción de la Falla"
              name="falla"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              required
              color="error"
              // CORRECCIÓN CRÍTICA: Vinculamos el value
              value={Data.falla}
              onChange={handleChange} 
              disabled={loading}
              placeholder="Especifique qué daño tiene la unidad..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaExclamationTriangle size={20} color="#d32f2f" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={loading}
            startIcon={<FaSave />} 
            sx={{ mt: 2 }}
          >
            {loading ? 'Guardando...' : 'Agregar Furgón'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}

export default FormAdd