import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

// Initial services data
const initialServices = [
    {
        name: 'Corte Clásico',
        description: 'Precisión y estilo atemporal con técnicas tradicionales',
        price: 25,
        duration: 45,
        image: '/fade_haircut_1768492500940.png',
        features: ['Lavado premium', 'Masaje capilar', 'Styling incluido'],
        active: true
    },
    {
        name: 'Fade Premium',
        description: 'Degradado perfecto con acabado de master',
        price: 30,
        duration: 60,
        image: '/barber_action_1768492485874.png',
        features: ['Diseño personalizado', 'Detallado con navaja', 'Productos premium'],
        active: true
    },
    {
        name: 'Barba & Afeitado',
        description: 'Cuidado profesional premium con toalla caliente',
        price: 20,
        duration: 30,
        image: '/beard_service_1768492517751.png',
        features: ['Afeitado clásico', 'Aceites esenciales', 'Hidratación profunda'],
        active: true
    },
    {
        name: 'Tratamiento Capilar',
        description: 'Revitaliza y fortalece tu cabello',
        price: 35,
        duration: 40,
        image: '/hero_barbershop_1768492467717.png',
        features: ['Productos orgánicos', 'Masaje revitalizante', 'Nutrición profunda'],
        active: true
    }
];

// Initial barbers data
const initialBarbers = [
    {
        name: 'Carlos Mendoza',
        specialty: 'Master Barber',
        experience: '15 años',
        image: '/barber_action_1768492485874.png',
        certifications: ['International Barber Association', 'Master Fade Specialist'],
        rating: 4.9,
        specialties: ['Fade Premium', 'Corte Clásico'],
        bio: 'Barbero profesional con más de 15 años de experiencia en cortes clásicos y modernos.',
        active: true
    },
    {
        name: 'Miguel Torres',
        specialty: 'Fade Specialist',
        experience: '10 años',
        image: '/beard_service_1768492517751.png',
        certifications: ['Advanced Cutting Techniques', 'Modern Barbering'],
        rating: 4.8,
        specialties: ['Fade Premium', 'Tratamiento Capilar'],
        bio: 'Especialista en degradados y técnicas modernas de barbería.',
        active: true
    },
    {
        name: 'David Ruiz',
        specialty: 'Beard Expert',
        experience: '12 años',
        image: '/fade_haircut_1768492500940.png',
        certifications: ['Classic Shaving Master', 'Beard Styling Pro'],
        rating: 4.9,
        specialties: ['Barba & Afeitado', 'Corte Clásico'],
        bio: 'Experto en cuidado de barba y afeitado clásico con navaja.',
        active: true
    }
];

// Function to seed services
export const seedServices = async () => {
    try {
        console.log('🌱 Iniciando seed de servicios...');

        for (const service of initialServices) {
            const docRef = await addDoc(collection(db, 'services'), {
                ...service,
                createdAt: new Date()
            });
            console.log(`✅ Servicio "${service.name}" creado con ID: ${docRef.id}`);
        }

        console.log('🎉 Servicios cargados exitosamente!');
        return { success: true, message: 'Servicios creados correctamente' };
    } catch (error) {
        console.error('❌ Error al hacer seed de servicios:', error);
        return { success: false, error: error.message };
    }
};

// Function to seed barbers
export const seedBarbers = async () => {
    try {
        console.log('🌱 Iniciando seed de barberos...');

        for (const barber of initialBarbers) {
            const docRef = await addDoc(collection(db, 'barbers'), {
                ...barber,
                createdAt: new Date()
            });
            console.log(`✅ Barbero "${barber.name}" creado con ID: ${docRef.id}`);
        }

        console.log('🎉 Barberos cargados exitosamente!');
        return { success: true, message: 'Barberos creados correctamente' };
    } catch (error) {
        console.error('❌ Error al hacer seed de barberos:', error);
        return { success: false, error: error.message };
    }
};

// Function to seed all data
export const seedAll = async () => {
    try {
        console.log('🌱 Iniciando seed completo...');

        const servicesResult = await seedServices();
        if (!servicesResult.success) {
            throw new Error('Error al cargar servicios: ' + servicesResult.error);
        }

        const barbersResult = await seedBarbers();
        if (!barbersResult.success) {
            throw new Error('Error al cargar barberos: ' + barbersResult.error);
        }

        console.log('🎉 Seed completo exitoso!');
        return {
            success: true,
            message: `${initialServices.length} servicios y ${initialBarbers.length} barberos cargados correctamente`
        };
    } catch (error) {
        console.error('❌ Error en seed completo:', error);
        return { success: false, error: error.message };
    }
};
