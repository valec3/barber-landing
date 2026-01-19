import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Avatar, Stack, IconButton } from '@mui/material';
import { Star, FormatQuote, ArrowBack, ArrowForward } from '@mui/icons-material';

const Testimonials = ({ testimonials }) => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        const timer = setInterval(next, 8000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <Box sx={{ py: 20, bgcolor: '#050505', position: 'relative' }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                    <FormatQuote sx={{ fontSize: 80, color: 'rgba(212,175,55,0.1)', mb: -4 }} />

                    <Box sx={{ minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontStyle: 'italic',
                                fontWeight: 300,
                                mb: 6,
                                lineHeight: 1.4,
                                color: '#EEE',
                                fontSize: { xs: '1.5rem', md: '2.5rem' },
                                position: 'relative',
                                px: 4,
                            }}
                        >
                            "{testimonials[current].text}"
                        </Typography>

                        <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    border: '2px solid #D4AF37',
                                    bgcolor: 'primary.main',
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    color: '#000'
                                }}
                            >
                                {testimonials[current].avatar}
                            </Avatar>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase' }}>
                                    {testimonials[current].name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
                                    CLIENTE FIEL - {testimonials[current].service}
                                </Typography>
                                <Stack direction="row" spacing={0.5} mt={1}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} sx={{ color: 'primary.main', fontSize: 16 }} />
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        sx={{ mt: 6 }}
                    >
                        <IconButton
                            onClick={prev}
                            sx={{
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#FFF',
                                '&:hover': { bgcolor: 'primary.main', color: '#000', borderColor: 'primary.main' }
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <IconButton
                            onClick={next}
                            sx={{
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#FFF',
                                '&:hover': { bgcolor: 'primary.main', color: '#000', borderColor: 'primary.main' }
                            }}
                        >
                            <ArrowForward />
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Testimonials;
