'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation' // 👈 IMPORTAR ESTO
import { 
  Box, TextField, Button, Radio, RadioGroup, FormControlLabel, 
  FormControl, FormLabel, Stack, Paper, InputAdornment, Snackbar, Alert 
} from '@mui/material'
import { FaSave, FaTruck, FaExclamationTriangle } from "react-icons/fa";

const FormAdd = () => { // Ya no recibe props
  const router = useRouter(); // 👈 INICIALIZAR ROUTER
  
  const initialData = { placa: '', estado: 'buena', falla: '' }
  const [Data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState({ open: false, text: '', type: 'success' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prevData) => ({ 
        ...prevData,
        [name]: value,
        ...(name === 'estado' && value === 'buena' ? { falla: '' } : {})
    }))
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/furgones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Data),
      })

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error en la respuesta');
      }

      setMensaje({ open: true, text: 'Furgón guardado correctamente', type: 'success' })
      setData(initialData)

      // 🚨 AQUÍ ESTÁ LA MAGIA:
      // Esto recarga los Server Components (MainData) y actualiza la tabla automáticamente
      router.refresh(); 

    } catch (error) {
      setMensaje({ open: true, text: error.message || 'Error de conexión', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // ... (El resto del return es idéntico a tu diseño actual)
  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%'}}>
       {/* ... tu JSX del formulario ... */}
       <Snackbar open={mensaje.open} autoHideDuration={4000} onClose={() => setMensaje({ ...mensaje, open: false })} >
          <Alert severity={mensaje.type} variant="filled">{mensaje.text}</Alert>
       </Snackbar>

       <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          {/* ... tus inputs ... */}
          <Stack spacing={3}>
             {/* ... Inputs de Placa, Estado, Falla ... */}
              <TextField 
                label="Número de Placa" variant="outlined" name="placa" fullWidth required
                value={Data.placa} onChange={handleChange} disabled={loading}
                slotProps={{ input: { startAdornment: (<InputAdornment position="start"><FaTruck size={20} color="gray" /></InputAdornment>), }, }}
              />
              {/* ... Resto del formulario ... */}
              <FormControl>
                <FormLabel>Estado de la unidad</FormLabel>
                <RadioGroup row name="estado" value={Data.estado} onChange={handleChange}>
                  <FormControlLabel value="buena" control={<Radio color="success" />} label="Buena" />
                  <FormControlLabel value="mala" control={<Radio color="error" />} label="Mala" />
                </RadioGroup>
              </FormControl>

             {Data.estado === 'mala' && (
                <TextField label="Falla" name="falla" fullWidth multiline rows={2} value={Data.falla} onChange={handleChange} />
             )}

             <Button type="submit" variant="contained" disabled={loading} startIcon={<FaSave />}>
                {loading ? 'Guardando...' : 'Agregar Furgón'}
             </Button>
          </Stack>
       </Box>
    </Paper>
  )
}

export default FormAdd