import React from 'react';
import { Box, Container, Typography, Button, Grid, TextField, Paper, Stack } from '@mui/material';
import { Phone, LocationOn, AccessTime, Instagram, Facebook, Twitter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ position: 'relative', py: 20, overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1585744944822-371821890967?auto=format&fit=crop&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.2) grayscale(1)',
                    zIndex: 0,
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }} justifyContent="center">
                <Grid container spacing={8} alignItems="center" justifyContent="center">
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 3, lineHeight: 1 }}>
                            Es hora de un <br />
                            <span style={{ color: '#D4AF37' }}>cambio radical</span>
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300, mb: 6, maxWidth: '90%' }}>
                            No es solo un corte, es una declaración de intenciones. Reserva tu espacio exclusivo ahora.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/booking')}
                            sx={{
                                px: 8,
                                py: 2.5,
                                fontSize: '1.2rem',
                                background: '#D4AF37',
                                color: '#000',
                                fontWeight: 800,
                                '&:hover': {
                                    background: '#FFF',
                                    transform: 'scale(1.05)',
                                }
                            }}
                        >
                            RESERVAR MI PUESTO
                        </Button>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Paper
                            sx={{
                                p: 6,
                                borderRadius: 8,
                                bgcolor: 'rgba(255,255,255,0.03)',
                                backdropFilter: 'blur(30px)',
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
                                CONTÁCTANOS
                            </Typography>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="NOMBRE COMPLETO"
                                    variant="standard"
                                    sx={{ '& .MuiInput-underline:before': { borderColor: 'rgba(255,255,255,0.2)' } }}
                                />
                                <TextField
                                    fullWidth
                                    label="CORREO ELECTRÓNICO"
                                    variant="standard"
                                    sx={{ '& .MuiInput-underline:before': { borderColor: 'rgba(255,255,255,0.2)' } }}
                                />
                                <TextField
                                    fullWidth
                                    label="¿CÓMO PODEMOS AYUDARTE?"
                                    variant="standard"
                                    multiline
                                    rows={3}
                                    sx={{ '& .MuiInput-underline:before': { borderColor: 'rgba(255,255,255,0.2)' } }}
                                />
                                <Button
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        py: 2,
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        color: '#FFF',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        '&:hover': { bgcolor: 'primary.main', color: '#000' }
                                    }}
                                >
                                    ENVIAR MENSAJE
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FinalCTA;
