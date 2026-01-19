import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37', // Metalic Gold
        },
        secondary: {
            main: '#FFFFFF',
        },
        background: {
            default: '#0A0A0A',
            paper: '#141414',
        },
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.65)',
        },
    },
    typography: {
        fontFamily: "'Outfit', sans-serif",
        h1: {
            fontSize: '4.5rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '2.25rem',
            fontWeight: 700,
        },
        button: {
            fontWeight: 600,
            letterSpacing: '0.05em',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'uppercase',
                    padding: '12px 24px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#141414',
                }
            }
        }
    },
});

export default theme;
