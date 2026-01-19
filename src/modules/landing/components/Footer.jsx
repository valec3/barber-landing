import React from 'react';
import { Box, Container, Typography, Grid, IconButton, Stack, Divider } from '@mui/material';
import { Instagram, Facebook, Twitter, Phone, Email, LocationOn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#000', color: '#FFF', pt: 15, pb: 4, borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} justifyContent="center">
            {/* Background elements */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)'
            }} />
            <Box sx={{
                position: 'absolute',
                top: -500,
                right: -500,
                width: 1000,
                height: 1000,
                background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <Container maxWidth="xl">
                <Grid container spacing={8} justifyContent="center" sx={{ mb: 8 }}>
                    <Grid item size={{ xs: 12, md: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: -1 }}>
                            BARBERÍA <span style={{ color: '#D4AF37' }}>PREMIUM</span>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 300, mb: 4, maxWidth: 350, lineHeight: 1.8 }}>
                            Redefiniendo el arte del grooming masculino desde 2016. Excelencia, precisión y estilo en un solo lugar.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <IconButton
                                    key={i}
                                    sx={{
                                        color: '#FFF',
                                        bgcolor: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: '#000',
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 5px 15px rgba(212,175,55,0.3)'
                                        }
                                    }}
                                >
                                    <Icon />
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, letterSpacing: 1 }}>NAV</Typography>
                        <Stack spacing={2}>
                            {['Inicio', 'Servicios', 'Equipo', 'Galería', 'Reservas'].map((item) => (
                                <Typography
                                    key={item}
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            color: 'primary.main',
                                            transform: 'translateX(5px)'
                                        }
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, letterSpacing: 1 }}>HORARIOS</Typography>
                        <Stack spacing={2}>
                            {['LUN - VIE', 'SÁBADO', 'DOMINGO'].map((day, i) => (
                                <Box key={day} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', pb: 1 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{day}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: i === 2 ? 'primary.main' : 'common.white' }}>
                                        {i === 0 ? '09:00 - 21:00' : i === 1 ? '10:00 - 20:00' : 'CERRADO'}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, letterSpacing: 1 }}>NEWSLETTER</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                            Suscríbete para recibir ofertas exclusivas y consejos de estilo directamente en tu email.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                p: 0.5,
                                bgcolor: 'rgba(255,255,255,0.03)',
                                borderRadius: 1,
                                border: '1px solid rgba(255,255,255,0.08)',
                                transition: 'border-color 0.3s',
                                '&:hover': { borderColor: 'rgba(212,175,55,0.3)' }
                            }}
                        >
                            <input
                                placeholder="Tu email"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#FFF',
                                    padding: '12px 15px',
                                    width: '100%',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <IconButton sx={{
                                bgcolor: 'primary.main',
                                borderRadius: 0.8,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: '#FFF',
                                    transform: 'scale(1.05)'
                                }
                            }}>
                                <Email sx={{ color: '#000', fontSize: 20 }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 4 }} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3,
                    mx: 'auto',
                    maxWidth: "90%"
                }}>
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                            © 2026 BARBERÍA PREMIUM. TODOS LOS DERECHOS RESERVADOS.
                        </Typography>
                        <Typography
                            variant="caption"
                            component="a"
                            href="https://valece.vercel.app/klein-code"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: 'rgba(255,255,255,0.3)',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            Made by Klein Code
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={4}>
                        {['PRIVACIDAD', 'TÉRMINOS', 'COOKIES'].map((text) => (
                            <Typography
                                key={text}
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    '&:hover': { color: '#FFF' },
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -4,
                                        left: 0,
                                        width: '0%',
                                        height: '1px',
                                        bgcolor: 'primary.main',
                                        transition: 'width 0.3s'
                                    },
                                    '&:hover:after': {
                                        width: '100%'
                                    }
                                }}
                            >
                                {text}
                            </Typography>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
