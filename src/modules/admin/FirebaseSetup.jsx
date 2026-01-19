import React, { useState } from 'react';
import { Box, Button, Container, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { CloudUpload, CheckCircle, Error } from '@mui/icons-material';
import { seedAll } from '../../utils/seedFirebase';

const FirebaseSetup = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSeedServices = async () => {
        setLoading(true);
        setResult(null);

        const response = await seedAll();

        setLoading(false);
        setResult(response);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper
                sx={{
                    p: 5,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,175,55,0.3)',
                }}
            >
                <CloudUpload sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />

                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                    Configuración de Firebase
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                    Haz clic en el botón para cargar los servicios y barberos iniciales en tu base de datos de Firebase.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSeedServices}
                    disabled={loading || (result && result.success)}
                    startIcon={loading ? <CircularProgress size={20} /> : <CloudUpload />}
                    sx={{
                        px: 6,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 0,
                        mb: 3,
                    }}
                >
                    {loading ? 'Cargando...' : result?.success ? 'Datos Cargados' : 'Cargar Datos Iniciales'}
                </Button>

                {result && (
                    <Alert
                        severity={result.success ? 'success' : 'error'}
                        icon={result.success ? <CheckCircle /> : <Error />}
                        sx={{
                            background: result.success
                                ? 'rgba(76, 175, 80, 0.1)'
                                : 'rgba(244, 67, 54, 0.1)',
                            border: `1px solid ${result.success ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'}`,
                        }}
                    >
                        {result.success ? result.message : `Error: ${result.error}`}
                    </Alert>
                )}

                {result?.success && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            ✅ Listo! Ahora puedes:
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            • Ver los servicios en <strong>/admin/services</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            • Crear reservas desde la landing page
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default FirebaseSetup;
