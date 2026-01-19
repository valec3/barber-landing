import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Container, Typography, Button, TextField,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from '@mui/material';
import { Add, Edit, Delete, ArrowBack } from '@mui/icons-material';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ServicesAdmin = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
    });

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'services'));
            const servicesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(servicesData);
        } catch (error) {
            console.error('Error loading services:', error);
        }
    };

    const handleOpenDialog = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                description: service.description,
                price: service.price,
                duration: service.duration,
            });
        } else {
            setEditingService(null);
            setFormData({ name: '', description: '', price: '', duration: '' });
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingService(null);
        setFormData({ name: '', description: '', price: '', duration: '' });
    };

    const handleSave = async () => {
        try {
            if (editingService) {
                await updateDoc(doc(db, 'services', editingService.id), formData);
            } else {
                await addDoc(collection(db, 'services'), formData);
            }
            handleCloseDialog();
            loadServices();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error al guardar el servicio');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
            try {
                await deleteDoc(doc(db, 'services', id));
                loadServices();
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Error al eliminar el servicio');
            }
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/')}
                        sx={{ color: 'primary.main' }}
                    >
                        Volver al Inicio
                    </Button>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            textTransform: 'uppercase',
                            letterSpacing: 2
                        }}
                    >
                        Gestión de Servicios
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => handleOpenDialog()}
                        sx={{ fontWeight: 600, borderRadius: 0 }}
                    >
                        Nuevo Servicio
                    </Button>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        background: 'rgba(30,30,30,0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(212,175,55,0.2)',
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Nombre</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Descripción</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Precio</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Duración</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>€{service.price}</TableCell>
                                    <TableCell>{service.duration} min</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleOpenDialog(service)}
                                            sx={{ color: 'primary.main' }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(service.id)}
                                            sx={{ color: 'error.main' }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {services.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                        No hay servicios registrados. Crea uno nuevo.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            background: 'rgba(30,30,30,0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(212,175,55,0.2)',
                        }
                    }}
                >
                    <DialogTitle sx={{ color: 'primary.main', fontWeight: 700 }}>
                        {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Nombre"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            sx={{ mt: 2, mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Descripción"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            multiline
                            rows={3}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Precio (€)"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Duración (minutos)"
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            disabled={!formData.name || !formData.price}
                            sx={{ fontWeight: 600, borderRadius: 0 }}
                        >
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default ServicesAdmin;
