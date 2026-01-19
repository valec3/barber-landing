import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Container, Typography, Button, TextField,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Stack, Avatar, Divider, FormControl, InputLabel, Select, MenuItem,
    Card, CardContent, Alert
} from '@mui/material';
import {
    ArrowBack, Visibility, Edit, Delete, FilterList, CalendarMonth,
    Schedule, Person, Phone, Email, CheckCircle, Cancel, HourglassEmpty,
    AttachMoney, ContentCut, Search
} from '@mui/icons-material';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase';

const BookingsAdmin = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const statusConfig = {
        pending: { label: 'Pendiente', color: 'warning', icon: <HourglassEmpty /> },
        confirmed: { label: 'Confirmada', color: 'info', icon: <CheckCircle /> },
        completed: { label: 'Completada', color: 'success', icon: <CheckCircle /> },
        cancelled: { label: 'Cancelada', color: 'error', icon: <Cancel /> },
    };

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [bookings, statusFilter, searchTerm]);

    const loadBookings = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const bookingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || new Date(),
            }));
            setBookings(bookingsData);
            setLoading(false);
        } catch (error) {
            console.error('Error loading bookings:', error);
            setLoading(false);
        }
    };

    const filterBookings = () => {
        let filtered = [...bookings];

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(b => (b.status || 'pending') === statusFilter);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(b =>
                b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.barber?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBookings(filtered);
    };

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
        setViewDialogOpen(true);
    };

    const handleUpdateStatus = async (bookingId, newStatus) => {
        try {
            await updateDoc(doc(db, 'bookings', bookingId), {
                status: newStatus,
                updatedAt: new Date(),
            });
            await loadBookings();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar el estado');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta reserva?')) {
            try {
                await deleteDoc(doc(db, 'bookings', id));
                await loadBookings();
            } catch (error) {
                console.error('Error deleting booking:', error);
                alert('Error al eliminar la reserva');
            }
        }
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => (b.status || 'pending') === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        completed: bookings.filter(b => b.status === 'completed').length,
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/')}
                        sx={{ color: 'primary.main', fontWeight: 600 }}
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
                        Gestión de Reservas
                    </Typography>
                    <Box sx={{ width: 120 }} /> {/* Spacer */}
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,255,255,0.05))' }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    {stats.total}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Reservas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ background: 'rgba(255, 152, 0, 0.1)' }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff9800' }}>
                                    {stats.pending}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pendientes
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ background: 'rgba(33, 150, 243, 0.1)' }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2196f3' }}>
                                    {stats.confirmed}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Confirmadas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: '#4caf50' }}>
                                    {stats.completed}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Completadas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filters */}
                <Paper sx={{ p: 3, mb: 3, background: 'rgba(30,30,30,0.8)', backdropFilter: 'blur(20px)' }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Buscar por nombre, email, servicio..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: <Search sx={{ color: 'primary.main', mr: 1 }} />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Estado"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    startAdornment={<FilterList sx={{ mr: 1, color: 'primary.main' }} />}
                                >
                                    <MenuItem value="all">Todas</MenuItem>
                                    <MenuItem value="pending">Pendientes</MenuItem>
                                    <MenuItem value="confirmed">Confirmadas</MenuItem>
                                    <MenuItem value="completed">Completadas</MenuItem>
                                    <MenuItem value="cancelled">Canceladas</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body2" color="text.secondary">
                                Mostrando {filteredBookings.length} de {bookings.length} reservas
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Table */}
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
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Fecha Reserva</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Cliente</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Servicio</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Barbero</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Fecha/Hora</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Estado</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Pago</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                        <Typography color="text.secondary">Cargando reservas...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : filteredBookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                        <Typography color="text.secondary">
                                            {searchTerm || statusFilter !== 'all'
                                                ? 'No se encontraron reservas con estos filtros'
                                                : 'No hay reservas registradas'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <TableRow key={booking.id} hover>
                                        <TableCell>{formatDate(booking.createdAt)}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                                                    {booking.customerName?.[0]?.toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {booking.customerName}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {booking.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {booking.service}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    €{booking.servicePrice} · {booking.serviceDuration}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{booking.barber || '-'}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarMonth sx={{ fontSize: '1rem', color: 'primary.main' }} />
                                                <Typography variant="body2">{booking.date}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Schedule sx={{ fontSize: '1rem', color: 'primary.main' }} />
                                                <Typography variant="body2">{booking.time}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                                <Select
                                                    value={booking.status || 'pending'}
                                                    onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                                                    sx={{ fontSize: '0.875rem' }}
                                                >
                                                    {Object.entries(statusConfig).map(([key, config]) => (
                                                        <MenuItem key={key} value={key}>
                                                            <Chip
                                                                icon={config.icon}
                                                                label={config.label}
                                                                color={config.color}
                                                                size="small"
                                                            />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                icon={booking.paid ? <CheckCircle /> : <Cancel />}
                                                label={booking.paid ? 'Pagado' : 'Pendiente'}
                                                color={booking.paid ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => handleViewBooking(booking)}
                                                sx={{ color: 'primary.main' }}
                                            >
                                                <Visibility />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(booking.id)}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* View Dialog */}
                <Dialog
                    open={viewDialogOpen}
                    onClose={() => setViewDialogOpen(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            background: 'rgba(30,30,30,0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(212,175,55,0.2)',
                        }
                    }}
                >
                    <DialogTitle sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.5rem' }}>
                        Detalles de la Reserva
                    </DialogTitle>
                    <DialogContent>
                        {selectedBooking && (
                            <Grid container spacing={3} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 3, background: 'rgba(212,175,55,0.1)' }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            CLIENTE
                                        </Typography>
                                        <Stack spacing={2}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Person sx={{ color: 'primary.main' }} />
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {selectedBooking.customerName}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Email sx={{ color: 'primary.main' }} />
                                                <Typography variant="body2">{selectedBooking.email}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Phone sx={{ color: 'primary.main' }} />
                                                <Typography variant="body2">{selectedBooking.phone}</Typography>
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 3, background: 'rgba(212,175,55,0.1)' }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            SERVICIO
                                        </Typography>
                                        <Stack spacing={2}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <ContentCut sx={{ color: 'primary.main' }} />
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {selectedBooking.service}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2">
                                                Barbero: <strong>{selectedBooking.barber}</strong>
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Chip label={`€${selectedBooking.servicePrice}`} color="primary" />
                                                <Chip label={selectedBooking.serviceDuration} />
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <Paper sx={{ p: 3, background: 'rgba(212,175,55,0.1)' }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                                            FECHA Y HORA
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 4 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarMonth sx={{ color: 'primary.main', fontSize: '2rem' }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">Fecha</Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                        {selectedBooking.date}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Schedule sx={{ color: 'primary.main', fontSize: '2rem' }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">Hora</Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                        {selectedBooking.time}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>

                                {selectedBooking.notes && (
                                    <Grid item xs={12}>
                                        <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.02)' }}>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                                NOTAS ADICIONALES
                                            </Typography>
                                            <Typography variant="body2">{selectedBooking.notes}</Typography>
                                        </Paper>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Alert severity="info" sx={{ background: 'rgba(33, 150, 243, 0.1)' }}>
                                        Reserva creada el {formatDate(selectedBooking.createdAt)}
                                    </Alert>
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setViewDialogOpen(false)} sx={{ color: 'text.secondary' }}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default BookingsAdmin;
