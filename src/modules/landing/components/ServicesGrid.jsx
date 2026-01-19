
import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, Chip } from '@mui/material';
import { Check } from '@mui/icons-material';

const ServicesGrid = ({ services }) => {
    const displayServices = services.slice(0, 4);

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 10, md: 20 } }}>
            <Box sx={{ mb: 10, textAlign: 'center' }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        mb: 2,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Servicios <span style={{ color: '#D4AF37' }}>Elite</span>
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300, maxWidth: 600, mx: 'auto' }}>
                    Elevamos el estándar de la barbería tradicional con técnicas de vanguardia y productos de lujo.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
                    gridAutoRows: 'minmax(300px, auto)',
                    gap: 3,
                }}
            >
                {displayServices.map((service, index) => (
                    <Card
                        key={service.id}
                        sx={{
                            gridArea: {
                                md: index === 0 ? '1 / 1 / 3 / 3' :
                                    index === 1 ? '1 / 3 / 2 / 5' :
                                        index === 2 ? '2 / 3 / 3 / 4' :
                                            index === 3 ? '2 / 4 / 3 / 5' : 'auto'
                            },
                            position: 'relative',
                            borderRadius: 6,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: '#141414',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                borderColor: 'primary.main',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)',
                                '& .service-img': {
                                    transform: 'scale(1.1)',
                                    filter: 'brightness(0.6)',
                                },
                                '& .service-content': {
                                    transform: 'translateY(0)',
                                }
                            }
                        }}
                    >
                        {service.image ? (
                            <CardMedia
                                component="img"
                                image={service.image}
                                className="service-img"
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    transition: 'all 0.6s ease',
                                    filter: 'brightness(0.4)',
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    background: 'linear-gradient(45deg, #1A1A1A, #0A0A0A)',
                                }}
                            />
                        )}

                        <Box
                            className="service-content"
                            sx={{
                                position: 'relative',
                                height: '100%',
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                zIndex: 1,
                                transition: 'all 0.4s ease',
                            }}
                        >
                            <Box sx={{ mb: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(212,175,55,0.1)', color: 'primary.main', backdropFilter: 'blur(10px)' }}>
                                    {service.icon}
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                                    {service.price}
                                </Typography>
                            </Box>

                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
                                {service.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, maxWidth: '80%' }}>
                                {service.description}
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {service.features?.map((f, i) => (
                                    <Chip
                                        key={i}
                                        label={f}
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            color: '#FFF',
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            borderRadius: 1,
                                            border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default ServicesGrid;
