import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Container, Typography, Button, TextField,
    Select, MenuItem, FormControl, InputLabel, Paper,
    Stepper, Step, StepLabel, Grid, Checkbox, FormControlLabel,
    Card, CardMedia, CardContent, Chip, Avatar, Stack, Divider, Alert, CircularProgress
} from '@mui/material';
import {
    ArrowBack, ContentCut, Face, AutoAwesome, LocalOffer,
    Check, Star, CalendarMonth, Schedule, Person
} from '@mui/icons-material';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

const BookingPage = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        service: '',
        barber: '',
        date: '',
        time: '',
        customerName: '',
        email: '',
        phone: '',
        notes: '',
        paid: false,
    });

    const steps = ['Servicio', 'Barbero', 'Fecha y Hora', 'Datos', 'Confirmación'];

    // Icon mapping for services
    const iconMap = {
        'Corte Clásico': <ContentCut />,
        'Fade Premium': <Face />,
        'Barba & Afeitado': <AutoAwesome />,
        'Tratamiento Capilar': <LocalOffer />
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            // Load services
            const servicesQuery = query(collection(db, 'services'), where('active', '==', true));
            const servicesSnapshot = await getDocs(servicesQuery);
            const servicesData = servicesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                icon: iconMap[doc.data().name] || <ContentCut />
            }));
            setServices(servicesData);

            // Load barbers
            const barbersQuery = query(collection(db, 'barbers'), where('active', '==', true));
            const barbersSnapshot = await getDocs(barbersQuery);
            const barbersData = barbersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBarbers(barbersData);

            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    };

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00',
        '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            const selectedService = services.find(s => s.name === bookingData.service);
            const selectedBarber = barbers.find(b => b.name === bookingData.barber);

            await addDoc(collection(db, 'bookings'), {
                ...bookingData,
                servicePrice: selectedService?.price,
                serviceDuration: selectedService?.duration,
                barberSpecialty: selectedBarber?.specialty,
                createdAt: new Date(),
                status: 'pending'
            });

            // Success modal/alert
            alert(`¡Reserva confirmada!

Servicio: ${bookingData.service}
Barbero: ${bookingData.barber}
Fecha: ${bookingData.date}
Hora: ${bookingData.time}

Te esperamos, ${bookingData.customerName} !`);

            navigate('/');
        } catch (error) {
            console.error('Error al crear reserva:', error);
            alert('Error al procesar la reserva. Verifica tu conexión a Firebase e intenta de nuevo.');
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                            Selecciona tu servicio
                        </Typography>
                        <Grid container spacing={3}>
                            {services.map((service) => (
                                <Grid item xs={12} sm={6} key={service.id}>
                                    <Card
                                        onClick={() => setBookingData({ ...bookingData, service: service.name })}
                                        sx={{
                                            cursor: 'pointer',
                                            border: bookingData.service === service.name ? '3px solid' : '1px solid',
                                            borderColor: bookingData.service === service.name ? 'primary.main' : 'rgba(255,255,255,0.1)',
                                            background: bookingData.service === service.name
                                                ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,255,255,0.05))'
                                                : 'rgba(255,255,255,0.02)',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 12px 28px rgba(212,175,55,0.3)',
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Box sx={{ color: 'primary.main', fontSize: '2.5rem' }}>{service.icon}</Box>
                                                {bookingData.service === service.name && (
                                                    <Chip
                                                        icon={<Check />}
                                                        label="Seleccionado"
                                                        size="small"
                                                        color="primary"
                                                    />
                                                )}
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                                {service.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                                {service.description}
                                            </Typography>

                                            <Stack spacing={0.5} sx={{ mb: 2 }}>
                                                {service.features?.map((feature, i) => (
                                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Check sx={{ fontSize: '1rem', color: 'primary.main', mr: 1 }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {feature}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Stack>

                                            <Divider sx={{ my: 2, borderColor: 'rgba(212,175,55,0.2)' }} />

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 800 }}>
                                                    €{service.price}
                                                </Typography>
                                                <Chip
                                                    icon={<Schedule />}
                                                    label={`${service.duration} min`}
                                                    size="small"
                                                    sx={{ background: 'rgba(255,255,255,0.1)' }}
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                );

            case 1:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                            Elige tu barbero
                        </Typography>
                        <Grid container spacing={3}>
                            {barbers.map((barber) => (
                                <Grid item xs={12} md={4} key={barber.id}>
                                    <Card
                                        onClick={() => setBookingData({ ...bookingData, barber: barber.name })}
                                        sx={{
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            height: 400,
                                            border: bookingData.barber === barber.name ? '3px solid' : '1px solid',
                                            borderColor: bookingData.barber === barber.name ? 'primary.main' : 'rgba(255,255,255,0.1)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                transform: 'scale(1.03)',
                                                boxShadow: '0 12px 32px rgba(212,175,55,0.4)',
                                            }
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={barber.image}
                                            alt={barber.name}
                                            sx={{ height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)' }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end',
                                                p: 3,
                                            }}
                                        >
                                            {bookingData.barber === barber.name && (
                                                <Chip
                                                    icon={<Check />}
                                                    label="Seleccionado"
                                                    size="small"
                                                    color="primary"
                                                    sx={{ position: 'absolute', top: 16, right: 16 }}
                                                />
                                            )}

                                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                {barber.name}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}>
                                                {barber.specialty}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Star sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                                                <Typography variant="body2">{barber.rating}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    · {barber.experience}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {bookingData.barber && (
                            <Alert
                                icon={<Check />}
                                severity="success"
                                sx={{ mt: 3, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
                            >
                                <Typography variant="body2">
                                    Has seleccionado a <strong>{bookingData.barber}</strong>
                                </Typography>
                            </Alert>
                        )}
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                            Fecha y hora de tu cita
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 3, background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <CalendarMonth sx={{ color: 'primary.main', mr: 2, fontSize: '2rem' }} />
                                        <Typography variant="h6">Selecciona la fecha</Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Fecha"
                                        value={bookingData.date}
                                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                                        sx={{ mt: 2 }}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 3, background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Schedule sx={{ color: 'primary.main', mr: 2, fontSize: '2rem' }} />
                                        <Typography variant="h6">Hora disponible</Typography>
                                    </Box>
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel>Hora</InputLabel>
                                        <Select
                                            value={bookingData.time}
                                            label="Hora"
                                            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                        >
                                            {timeSlots.map((time) => (
                                                <MenuItem key={time} value={time}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                        <Schedule sx={{ mr: 2, color: 'primary.main' }} />
                                                        {time}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Paper>
                            </Grid>
                        </Grid>

                        {bookingData.date && bookingData.time && (
                            <Alert
                                icon={<Check />}
                                severity="success"
                                sx={{ mt: 3, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
                            >
                                Tu cita está programada para el <strong>{bookingData.date}</strong> a las <strong>{bookingData.time}</strong>
                            </Alert>
                        )}
                    </Box>
                );

            case 3:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
                            Tus datos de contacto
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nombre Completo"
                                    value={bookingData.customerName}
                                    onChange={(e) => setBookingData({ ...bookingData, customerName: e.target.value })}
                                    placeholder="Ej: Juan Pérez"
                                    InputProps={{
                                        startAdornment: <Person sx={{ color: 'primary.main', mr: 1 }} />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    value={bookingData.email}
                                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                    placeholder="tu@email.com"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="tel"
                                    label="Teléfono"
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                    placeholder="+34 600 000 000"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Notas adicionales (opcional)"
                                    value={bookingData.notes}
                                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                                    multiline
                                    rows={3}
                                    placeholder="¿Alguna preferencia o comentario especial?"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );

            case 4:
                const selectedService = services.find(s => s.name === bookingData.service);
                const selectedBarber = barbers.find(b => b.name === bookingData.barber);

                return (
                    <Box>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
                            Confirma tu Reserva
                        </Typography>

                        <Paper
                            sx={{
                                p: 4,
                                mb: 3,
                                background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(255,255,255,0.05))',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(212,175,55,0.3)'
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            SERVICIO
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ color: 'primary.main', fontSize: '2rem' }}>{selectedService?.icon}</Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {bookingData.service}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {selectedService?.duration} · €{selectedService?.price}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            BARBERO
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                src={selectedBarber?.image}
                                                sx={{ width: 56, height: 56, border: '2px solid', borderColor: 'primary.main' }}
                                            />
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {bookingData.barber}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {selectedBarber?.specialty}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            FECHA Y HORA
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 3 }}>
                                            <Box>
                                                <CalendarMonth sx={{ color: 'primary.main', mb: 0.5 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {bookingData.date}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Schedule sx={{ color: 'primary.main', mb: 0.5 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {bookingData.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            CLIENTE
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            {bookingData.customerName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {bookingData.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {bookingData.phone}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {bookingData.notes && (
                                <>
                                    <Divider sx={{ my: 3, borderColor: 'rgba(212,175,55,0.2)' }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            NOTAS ADICIONALES
                                        </Typography>
                                        <Typography variant="body2">
                                            {bookingData.notes}
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </Paper>

                        <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 800 }}>
                                    €{selectedService?.price}
                                </Typography>
                            </Box>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={bookingData.paid}
                                        onChange={(e) => setBookingData({ ...bookingData, paid: e.target.checked })}
                                        sx={{ color: 'primary.main' }}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        Marcar como pagado <Chip label="Simulación" size="small" sx={{ ml: 1 }} />
                                    </Typography>
                                }
                            />
                        </Paper>

                        <Alert severity="info" sx={{ mt: 3 }}>
                            Al confirmar, se enviará un email de confirmación a <strong>{bookingData.email}</strong>
                        </Alert>
                    </Box>
                );

            default:
                return null;
        }
    };

    const isStepValid = () => {
        switch (activeStep) {
            case 0:
                return bookingData.service !== '';
            case 1:
                return bookingData.barber !== '';
            case 2:
                return bookingData.date !== '' && bookingData.time !== '';
            case 3:
                return bookingData.customerName !== '' && bookingData.email !== '' && bookingData.phone !== '';
            case 4:
                return true;
            default:
                return false;
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
            <Container maxWidth="lg">
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/')}
                    sx={{ mb: 4, color: 'primary.main', fontWeight: 600 }}
                >
                    Volver al Inicio
                </Button>

                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            color: 'primary.main',
                            textTransform: 'uppercase',
                            letterSpacing: 3,
                            mb: 2
                        }}
                    >
                        Reserva tu Cita
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
                        Tu transformación comienza aquí
                    </Typography>
                </Box>

                <Paper
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(30,30,30,0.9), rgba(20,20,20,0.95))',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
                    }}
                >
                    <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel
                                    StepIconProps={{
                                        sx: {
                                            '&.Mui-active': { color: 'primary.main' },
                                            '&.Mui-completed': { color: 'primary.main' },
                                        }
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box sx={{ mb: 5, minHeight: 400 }}>
                        {renderStepContent(activeStep)}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3, borderTop: '1px solid rgba(212,175,55,0.2)' }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{
                                color: 'text.secondary',
                                '&:disabled': { color: 'rgba(255,255,255,0.3)' }
                            }}
                        >
                            Atrás
                        </Button>

                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!isStepValid()}
                                sx={{
                                    px: 8,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: 0,
                                    boxShadow: '0 0 30px rgba(212,175,55,0.4)',
                                    '&:hover': {
                                        boxShadow: '0 0 50px rgba(212,175,55,0.7)',
                                        transform: 'translateY(-2px)',
                                    }
                                }}
                            >
                                Confirmar Reserva
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    fontWeight: 600,
                                    borderRadius: 0,
                                }}
                            >
                                Siguiente
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default BookingPage;
