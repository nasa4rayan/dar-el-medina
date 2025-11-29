document.addEventListener('DOMContentLoaded', () => {


    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });


    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });


    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            tabBtns.forEach(b => b.classList.remove('active'));

            btn.classList.add('active');


            menuContents.forEach(content => content.classList.remove('active'));


            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });


    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Reservation Confirmed!';
            btn.style.backgroundColor = '#2ecc71';
            btn.style.borderColor = '#2ecc71';
            btn.style.color = '#fff';

            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                alert('Thank you! Your table at Dar El Medina has been reserved. We look forward to welcoming you.');
            }, 2000);
        });
    }


    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    const animateElements = document.querySelectorAll('.dish-card, .menu-item, .gallery-item, .review-card, .section-title');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });


    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(26, 26, 26, 0.85)';
        }
    });

});
