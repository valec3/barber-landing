import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { ContentCut, Face, AutoAwesome, LocalOffer } from '@mui/icons-material';

// Components
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import ServicesGrid from './components/ServicesGrid';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { useScrollReveal } from '../../shared/hooks/useScrollReveal';
const mockServices = [
    { id: '1', name: 'Corte Clásico', price: 25, description: 'Corte tradicional con tijera y navaja', icon: <ContentCut /> },
    { id: '2', name: 'Fade Premium', price: 30, description: 'Degradado perfecto con acabados de lujo', icon: <Face /> },
    { id: '3', name: 'Barba & Afeitado', price: 20, description: 'Perfilado y tratamiento de toalla caliente', icon: <AutoAwesome /> },
    { id: '4', name: 'Tratamiento Capilar', price: 35, description: 'Exfoliación y nutrición profunda', icon: <LocalOffer /> },
];

const mockBarbers = [
    { id: '1', name: 'Carlos Ruiz', specialty: 'Master Barber', rating: 5.0, experience: '10 Años', verified: true, image: 'https://images.unsplash.com/photo-1583900985715-29f2d8bdd05b?auto=format&fit=crop&q=80' },
    { id: '2', name: 'Miguel Ángel', specialty: 'Fade Specialist', rating: 4.9, experience: '8 Años', verified: true, image: 'https://images.unsplash.com/photo-1590483000692-549d4d333612?auto=format&fit=crop&q=80' },
    { id: '3', name: 'David Costa', specialty: 'Beard Expert', rating: 4.8, experience: '6 Años', verified: true, image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80' },
];
const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [loading, setLoading] = useState(true);

    useScrollReveal([services, barbers]);

    const iconMap = {
        'Corte Clásico': <ContentCut />,
        'Fade Premium': <Face />,
        'Barba & Afeitado': <AutoAwesome />,
        'Tratamiento Capilar': <LocalOffer />
    };

    useEffect(() => {
        loadData();
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadData = async () => {


        try {
            setLoading(true);
            const servicesQuery = query(collection(db, 'services'), where('active', '==', true));
            const servicesSnapshot = await getDocs(servicesQuery);
            let servicesData = servicesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                icon: iconMap[doc.data().name] || <ContentCut />,
                price: `€${doc.data().price}`,
            }));

            if (servicesData.length === 0) {
                servicesData = mockServices;
            }
            setServices(servicesData);

            const barbersQuery = query(collection(db, 'barbers'), where('active', '==', true));
            const barbersSnapshot = await getDocs(barbersQuery);
            let barbersData = barbersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                verified: true
            }));

            if (barbersData.length === 0) {
                barbersData = mockBarbers;
            }
            setBarbers(barbersData);

            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setServices(mockServices);
            setBarbers(mockBarbers);
            setLoading(false);
        }
    };

    const testimonials = [
        {
            name: 'Javier Martínez',
            text: 'La atención es excepcional. Carlos es un verdadero artista con las tijeras. Nunca había encontrado una barbería que entienda exactamente lo que quiero.',
            rating: 5,
            service: 'Fade Premium',
            avatar: 'JM'
        },
        {
            name: 'Pablo Rodríguez',
            text: 'El ambiente de la barbería es único. Profesionales de primer nivel y productos de la mejor calidad. Cada visita es una experiencia premium.',
            rating: 5,
            service: 'Corte Clásico',
            avatar: 'PR'
        },
        {
            name: 'Andrés López',
            text: 'Miguel es increíble con el fade. La precisión y el detalle son impresionantes. Ya no voy a ninguna otra barbería. 100% recomendado.',
            rating: 5,
            service: 'Barba & Afeitado',
            avatar: 'AL'
        },
    ];

    if (loading) {
        return (
            <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0A0A0A' }}>
                <CircularProgress sx={{ color: 'primary.main' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            <div className="grain-overlay" />
            <Hero scrollY={scrollY} />

            <div className="reveal">
                <StatsBanner />
            </div>

            <div className="reveal">
                <ServicesGrid services={services} />
            </div>

            <div className="reveal">
                <Team barbers={barbers} />
            </div>

            <div className="reveal">
                <Testimonials testimonials={testimonials} />
            </div>

            <div className="reveal">
                <FinalCTA />
            </div>

            <Footer />
        </Box>
    );
};

export default LandingPage;
