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

            // Get form data
            const name = form.querySelector('input[type="text"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const date = form.querySelector('input[type="date"]').value;
            const time = form.querySelector('input[type="time"]').value;
            const people = form.querySelector('select').value;

            // Create Google Calendar event details
            const startDateTime = new Date(`${date}T${time}`);
            const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

            // Format dates for Google Calendar
            const formatDateTime = (date) => {
                return date.toISOString().replace(/-|:|\.\d+/g, '');
            };

            const eventTitle = `حجز طاولة - ${name}`;
            const eventDetails = `
الاسم: ${name}
الهاتف: ${phone}
عدد الأشخاص: ${people}
المطعم: دار المدينة
العنوان: 3 زنقة بنجلول، سوق السباط، الرباط
            `.trim();

            // Google Calendar URL
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formatDateTime(startDateTime)}/${formatDateTime(endDateTime)}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent('Dar El Medina, 3 Rue Benjelloul, Rabat')}`;

            // WhatsApp message
            const whatsappMessage = `
مرحبا! أريد حجز طاولة:
📅 التاريخ: ${date}
⏰ الوقت: ${time}
👥 عدد الأشخاص: ${people}
👤 الاسم: ${name}
📞 الهاتف: ${phone}
            `.trim();

            const whatsappUrl = `https://wa.me/212702707071?text=${encodeURIComponent(whatsappMessage)}`;

            // Show success message
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = '✓ تم استلام الطلب!';
            btn.style.backgroundColor = '#2ecc71';
            btn.style.borderColor = '#2ecc71';
            btn.style.color = '#fff';

            // Create confirmation dialog
            const confirmDialog = document.createElement('div');
            confirmDialog.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a1a1a;
                padding: 2rem;
                border-radius: 10px;
                border: 2px solid #D4AF37;
                z-index: 10000;
                max-width: 400px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            `;

            confirmDialog.innerHTML = `
                <h3 style="color: #D4AF37; margin-bottom: 1rem; font-family: 'Amiri', serif;">تأكيد الحجز</h3>
                <p style="color: #ccc; margin-bottom: 1.5rem; font-family: 'Amiri', serif;">اختر كيف تريد تأكيد حجزك:</p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="${whatsappUrl}" target="_blank" style="background: #25d366; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-family: 'Amiri', serif; font-weight: bold;">
                        <i class="fab fa-whatsapp"></i> إرسال عبر واتساب
                    </a>
                    <a href="${googleCalendarUrl}" target="_blank" style="background: #4285f4; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-family: 'Amiri', serif; font-weight: bold;">
                        <i class="far fa-calendar-plus"></i> إضافة إلى Google Calendar
                    </a>
                    <button id="closeConfirm" style="background: transparent; color: #888; padding: 12px 20px; border: 1px solid #444; border-radius: 5px; cursor: pointer; font-family: 'Amiri', serif;">
                        إغلاق
                    </button>
                </div>
            `;

            document.body.appendChild(confirmDialog);

            // Close dialog
            const closeBtn = confirmDialog.querySelector('#closeConfirm');
            closeBtn.addEventListener('click', () => {
                confirmDialog.remove();
                form.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            });

            // Auto close after 30 seconds
            setTimeout(() => {
                if (document.body.contains(confirmDialog)) {
                    confirmDialog.remove();
                    form.reset();
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }
            }, 30000);
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

    // WhatsApp Popup Widget
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const closeWhatsappPopup = document.getElementById('closeWhatsappPopup');
    const sendWhatsapp = document.getElementById('sendWhatsapp');
    const whatsappInput = document.getElementById('whatsappInput');

    if (whatsappFloat && whatsappPopup) {
        // Toggle popup
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            whatsappPopup.classList.toggle('active');
        });

        // Close popup
        if (closeWhatsappPopup) {
            closeWhatsappPopup.addEventListener('click', () => {
                whatsappPopup.classList.remove('active');
            });
        }

        // Send message
        const sendMessage = () => {
            const message = whatsappInput.value.trim();
            if (message) {
                const phoneNumber = '212702707071';
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
                whatsappInput.value = '';
                whatsappPopup.classList.remove('active');
            }
        };

        if (sendWhatsapp) {
            sendWhatsapp.addEventListener('click', sendMessage);
        }

        // Send on Enter key
        if (whatsappInput) {
            whatsappInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

});
