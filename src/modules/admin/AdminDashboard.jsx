import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box, Container, Typography, Button, Paper, Grid, Card, CardContent,
    Stack, Chip
} from '@mui/material';
import {
    Dashboard, EventNote, ContentCut, Settings, ArrowBack,
    TrendingUp, People
} from '@mui/icons-material';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const adminSections = [
        {
            title: 'Gestión de Reservas',
            description: 'Ver, filtrar y administrar todas las reservas',
            icon: <EventNote sx={{ fontSize: '3rem' }} />,
            path: '/admin/bookings',
            color: 'rgba(33, 150, 243, 0.2)',
            accentColor: '#2196f3'
        },
        {
            title: 'Gestión de Servicios',
            description: 'Crear, editar y eliminar servicios',
            icon: <ContentCut sx={{ fontSize: '3rem' }} />,
            path: '/admin/services',
            color: 'rgba(212, 175, 55, 0.2)',
            accentColor: '#D4AF37'
        },
        {
            title: 'Configuración Inicial',
            description: 'Cargar datos iniciales en Firebase',
            icon: <Settings sx={{ fontSize: '3rem' }} />,
            path: '/setup',
            color: 'rgba(156, 39, 176, 0.2)',
            accentColor: '#9c27b0'
        },
    ];

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

                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Dashboard sx={{ fontSize: '4rem', color: 'primary.main', mb: 2 }} />
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
                        Panel de Administración
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
                        Control total de tu barbería
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {adminSections.map((section, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                onClick={() => navigate(section.path)}
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    background: `linear-gradient(135deg, ${section.color}, rgba(255,255,255,0.02))`,
                                    backdropFilter: 'blur(20px)',
                                    border: `2px solid ${section.accentColor}50`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 16px 48px ${section.accentColor}40`,
                                        border: `2px solid ${section.accentColor}`,
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Box sx={{ color: section.accentColor, mb: 3 }}>
                                        {section.icon}
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                                        {section.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                                        {section.description}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: section.accentColor,
                                            color: section.accentColor,
                                            borderRadius: 0,
                                            '&:hover': {
                                                borderColor: section.accentColor,
                                                background: `${section.accentColor}20`,
                                            }
                                        }}
                                    >
                                        Acceder
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Paper
                    sx={{
                        mt: 6,
                        p: 4,
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(255,255,255,0.02))',
                        border: '1px solid rgba(212,175,55,0.3)',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                        Accesos Rápidos
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<EventNote />}
                            onClick={() => navigate('/admin/bookings')}
                            sx={{ flex: 1, py: 1.5, borderRadius: 0 }}
                        >
                            Ver Reservas
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<ContentCut />}
                            onClick={() => navigate('/admin/services')}
                            sx={{ flex: 1, py: 1.5, borderRadius: 0 }}
                        >
                            Gestionar Servicios
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<People />}
                            onClick={() => navigate('/')}
                            sx={{ flex: 1, py: 1.5, borderRadius: 0 }}
                        >
                            Ir a Landing
                        </Button>
                    </Stack>
                </Paper>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        Panel de administración · Barbería Premium · v1.0
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminDashboard;
