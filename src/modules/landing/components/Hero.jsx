import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Hero = ({ scrollY }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#000',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('/hero_barbershop_1768492467717.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.4) saturate(0.8)',
                    transform: `scale(${1 + scrollY * 0.0002})`,
                    transition: 'transform 0.1s ease-out',
                    zIndex: 0,
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30vh',
                    background: 'linear-gradient(to top, #0A0A0A, transparent)',
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
                <Stack spacing={4} alignItems="center" textAlign="center">
                    <Box className="floating">
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '4rem', md: '12rem' },
                                fontWeight: 900,
                                lineHeight: 0.8,
                                textTransform: 'uppercase',
                                fontStyle: 'italic',
                                background: 'linear-gradient(180deg, #FFFFFF 30%, rgba(255,255,255,0.1) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.05em',
                                mb: 1,
                            }}
                        >
                            LEGADO
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '3.5rem', md: '10rem' },
                                fontWeight: 900,
                                lineHeight: 0.8,
                                textTransform: 'uppercase',
                                color: 'primary.main',
                                letterSpacing: '-0.02em',
                                textShadow: '0 0 50px rgba(212,175,55,0.3)',
                            }}
                        >
                            URBANO
                        </Typography>
                    </Box>

                    <Typography
                        variant="h5"
                        sx={{
                            maxWidth: '700px',
                            color: 'text.secondary',
                            fontWeight: 300,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            opacity: 0.8,
                        }}
                    >
                        Maestría en cada corte. Tradición en cada detalle.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/booking')}
                            sx={{
                                px: 6,
                                py: 2,
                                fontSize: '1.1rem',
                                background: 'linear-gradient(45deg, #D4AF37 30%, #F8F8F8 90%)',
                                color: '#000',
                                boxShadow: '0 10px 30px rgba(212,175,55,0.4)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 15px 40px rgba(212,175,55,0.6)',
                                }
                            }}
                        >
                            Reservar Ahora
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                px: 6,
                                py: 2,
                                fontSize: '1.1rem',
                                borderColor: 'rgba(255,255,255,0.3)',
                                color: '#FFF',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'rgba(212,175,55,0.1)',
                                }
                            }}
                        >
                            Ver Servicios
                        </Button>
                    </Stack>
                </Stack>
            </Container>

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    opacity: 0.5,
                }}
            >
                <Typography variant="caption" sx={{ letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                    Scroll
                </Typography>
                <Box
                    sx={{
                        width: '1px',
                        height: '60px',
                        background: 'linear-gradient(to bottom, #D4AF37, transparent)',
                        animation: 'scrollDown 2s infinite',
                        '@keyframes scrollDown': {
                            '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
                            '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
                            '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
                            '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default Hero;
