import React from 'react';
import { Box, Container, Typography, Grid, IconButton, Avatar, Chip, Stack } from '@mui/material';
import { Instagram, Twitter, Facebook, Star, Verified } from '@mui/icons-material';

const Team = ({ barbers }) => {
    return (
        <Box sx={{ py: 15, position: 'relative', overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
                    zIndex: 0,
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ mb: 10, textAlign: 'center' }}>
                    <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, fontWeight: 700 }}>
                        Maestros Artesanos
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, textTransform: 'uppercase' }}>
                        Nuestro <span style={{ color: '#D4AF37' }}>Equipo</span>
                    </Typography>
                </Box>

                <Grid container spacing={4} alignItems="center" justifyContent="center" >
                    {barbers.map((barber, index) => (
                        <Grid size={{
                            xs: 12,
                            md: 4,
                        }} key={index}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    '&:hover': {
                                        '& .barber-card': { transform: 'translateY(-15px)' },
                                        '& .barber-social': { opacity: 1, transform: 'translateX(0)' },
                                        '& .barber-info': { bgcolor: 'primary.main', color: '#000' },
                                        '& .barber-info .subtitle': { color: 'rgba(0,0,0,0.6)' }
                                    }
                                }}
                            >
                                <Box
                                    className="barber-card"
                                    sx={{
                                        position: 'relative',
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        aspectRatio: '4/5',
                                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                        bgcolor: '#1A1A1A',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={barber.image || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80'}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            filter: 'grayscale(0.5) contrast(1.1)',
                                            transition: 'all 0.6s ease',
                                        }}
                                    />

                                    <Box
                                        className="barber-social"
                                        sx={{
                                            position: 'absolute',
                                            top: 30,
                                            right: 30,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            opacity: 0,
                                            transform: 'translateX(20px)',
                                            transition: 'all 0.4s ease 0.1s',
                                        }}
                                    >
                                        {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                            <IconButton
                                                key={i}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(255,255,255,0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    color: '#FFF',
                                                    '&:hover': { bgcolor: 'primary.main', color: '#000' }
                                                }}
                                            >
                                                <Icon fontSize="small" />
                                            </IconButton>
                                        ))}
                                    </Box>
                                </Box>

                                <Box
                                    className="barber-info"
                                    sx={{
                                        position: 'relative',
                                        mt: -6,
                                        mx: 3,
                                        p: 3,
                                        borderRadius: 4,
                                        bgcolor: '#0A0A0A',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'all 0.4s ease',
                                        zIndex: 2,
                                    }}
                                >
                                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                            {barber.name}
                                        </Typography>
                                        <Verified sx={{ fontSize: 18, color: barber.verified ? 'primary.main' : 'transparent' }} />
                                    </Stack>

                                    <Typography className="subtitle" variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>
                                        {barber.specialty}
                                    </Typography>

                                    <Stack direction="row" spacing={1} mt={2} justifyContent="center">
                                        {Array.from({ length: Math.floor(barber.rating) }).map((_, i) => (
                                            <Box key={i} sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%' }} />
                                        ))}
                                        <Chip
                                            label={`${barber.experience} EXP`}
                                            size="small"
                                            sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary', fontSize: '0.65rem' }}
                                        />
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Team;
