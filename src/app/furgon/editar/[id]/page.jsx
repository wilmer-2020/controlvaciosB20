'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
    Box, TextField, Button, Radio, RadioGroup, FormControlLabel, 
    FormControl, FormLabel, Stack, Paper, InputAdornment, Typography, CircularProgress, Alert
} from '@mui/material'
import { FaTruck, FaExclamationTriangle, FaTimesCircle, FaPen } from "react-icons/fa";
import { LuArrowBigUpDash } from "react-icons/lu";

const Page = ({ params }) => {
    const router = useRouter();
    const [furgonData, setFurgonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // ----- CARGAR FURGÓN -----
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { id } = await params;

                const response = await fetch(`/api/furgones/${id}`);
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || "Furgón no encontrado.");

                setFurgonData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);


    // ----- HANDLE CHANGE -----
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFurgonData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'estado' && value === 'buena' ? { falla: '' } : {})
        }));
    };


    const handleCancel = () => {
        router.push('/');
    };


    // ----- ACTUALIZAR FURGÓN -----
    const handleUpdate = async(event) => {
        event.preventDefault();

        try {
            setIsUpdating(true);
            const { id } = await params;

            const res = await fetch(`/api/furgones/${id}`, {     // <--- FALTA EL await AQUÍ
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(furgonData),
            });

            const data = await res.json();       // <--- AHORA SI ES UNA PROMISE REAL

            if (!res.ok) {
                throw new Error(data.error || 'Error al actualizar el furgón');
            }
            alert('Furgón actualizado correctamente');
            router.push('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsUpdating(false);
        }
    };


    // ------ RENDER ------
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
                <Typography ml={2}>Cargando datos del furgón...</Typography>
            </Box>
        );
    }

    if (error || !furgonData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <Alert severity="error">Error: {error || "No se pudo cargar el furgón."}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>

                <Typography variant="h5" component="h1" mb={3} sx={{ fontWeight: 'bold' }}>
                    <FaPen size={20} style={{ marginRight: '10px' }} /> Editando Furgón
                </Typography>

                <Box component="form" onSubmit={handleUpdate} autoComplete="off">
                    <Stack spacing={3}>

                        <TextField
                            label="Número de Placa"
                            name="placa"
                            required
                            fullWidth
                            value={furgonData.placa}
                            onChange={handleChange}
                            disabled={isUpdating}
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
                            <FormLabel>Estado de la unidad</FormLabel>
                            <RadioGroup row name="estado" value={furgonData.estado} onChange={handleChange}>
                                <FormControlLabel value="buena" control={<Radio color="success" />} label="Buena" />
                                <FormControlLabel value="mala" control={<Radio color="error" />} label="Mala" />
                            </RadioGroup>
                        </FormControl>

                        {furgonData.estado === 'mala' && (
                            <TextField
                                label="Descripción de la Falla"
                                name="falla"
                                required
                                fullWidth
                                multiline
                                rows={2}
                                color="error"
                                value={furgonData.falla || ""}
                                onChange={handleChange}
                                disabled={isUpdating}
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
                            startIcon={<LuArrowBigUpDash />}
                            disabled={isUpdating}
                            sx={{ backgroundColor: '#01743D' }}
                        >
                            {isUpdating ? "Actualizando..." : "Actualizar Furgón"}
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            color="error"
                            startIcon={<FaTimesCircle />}
                            onClick={handleCancel}
                            disabled={isUpdating}
                        >
                            Cancelar y Volver
                        </Button>

                    </Stack>
                </Box>

            </Paper>
        </Box>
    );
};

export default Page;
