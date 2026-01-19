import React from 'react';
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { TrendingUp, EmojiEvents, Star, Verified } from '@mui/icons-material';

const StatsBanner = () => {
    const stats = [
        { number: '10+', label: 'Años de Experiencia', icon: <TrendingUp /> },
        { number: '5k+', label: 'Clientes Satisfechos', icon: <EmojiEvents /> },
        { number: '4.9', label: 'Valoración Media', icon: <Star /> },
        { number: '100%', label: 'Satisfacción', icon: <Verified /> },
    ];

    return (
        <Box sx={{ bgcolor: 'rgba(212,175,55,0.05)', py: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }} justifyContent="center">
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Stack alignItems="center" textAlign="center" spacing={1}>
                                <Box sx={{ color: 'primary.main', fontSize: '2rem', mb: 1 }}>
                                    {stat.icon}
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 900, color: '#FFF' }}>
                                    {stat.number}
                                </Typography>
                                <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 2, fontWeight: 700 }}>
                                    {stat.label}
                                </Typography>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default StatsBanner;
