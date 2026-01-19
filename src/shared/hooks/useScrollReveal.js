import { useEffect } from 'react';

const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
};
export const useScrollReveal = (deps = []) => {
    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        // Initial check and observe
        revealElements.forEach(el => {
            // Check if already in viewport
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            } else {
                observer.observe(el);
            }
        });

        return () => {
            revealElements.forEach(el => observer.unobserve(el));
        };
    }, deps);
};
