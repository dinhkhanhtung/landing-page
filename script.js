// script.js - Xử lý form liên hệ cho landing page

// Modal Thông báo Form
let modalOverlay, modalContent, modalCloseBtn, modalOkBtn, modalMessage;
function showMessageModal(message) {
    if (!modalOverlay) {
        modalOverlay = document.getElementById('modalOverlay');
        modalContent = document.querySelector('.modal-content');
        modalCloseBtn = document.getElementById('modalCloseBtn');
        modalOkBtn = document.getElementById('modalOkBtn');
        modalMessage = document.getElementById('modalMessage');
        // Sự kiện đóng modal
        modalCloseBtn.addEventListener('click', hideMessageModal);
        modalOkBtn.addEventListener('click', hideMessageModal);
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) hideMessageModal();
        });
    }
    modalMessage.textContent = message;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function hideMessageModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const phone = form.phone.value.trim();
            const message = form.message.value.trim();
            if (!name || !email || !phone || !message) {
                showMessageModal('Vui lòng điền đầy đủ thông tin!');
                return;
            }
            showMessageModal('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi trong thời gian sớm nhất.');
            form.reset();
        });
    }

    // Active menu navigation
    function updateActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active state after scroll
                setTimeout(() => {
                    updateActiveMenu();
                }, 100);
            }
        });
    });

    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();

    // New Simple Mobile Navigation
    function initMobileNav() {
        const mobileToggle = document.getElementById('mobileNavToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (!mobileToggle || !mobileNav) return;

        // Toggle mobile navigation
        function toggleMobileNav() {
            const isActive = mobileNav.classList.contains('active');

            if (isActive) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        }

        function openMobileNav() {
            mobileToggle.classList.add('active');
            mobileNav.classList.add('active');
        }

        function closeMobileNav() {
            mobileToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }

        // Event listeners
        mobileToggle.addEventListener('click', toggleMobileNav);

        // Close menu when clicking on nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // If it's a hash link, scroll to section
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        closeMobileNav();
                        setTimeout(() => {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            updateActiveMenu();
                        }, 100);
                    }
                } else {
                    closeMobileNav();
                }
            });
        });

        // Close menu on window resize if it gets too wide
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900 && mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                closeMobileNav();
            }
        });
    }
    initMobileNav();

    // Testimonials Carousel/Slider JS - Hiển thị 2 đánh giá trên desktop, 1 trên mobile
    function initTestimonialCarousel() {
        const slider = document.querySelector('.testimonial-carousel');
        if (!slider) return;
        const list = slider.querySelector('.testimonial-list');
        const items = slider.querySelectorAll('.testimonial-card');
        const dotsContainer = slider.querySelector('.testimonial-dots');
        const leftBtn = slider.querySelector('.testimonial-arrow.left');
        const rightBtn = slider.querySelector('.testimonial-arrow.right');
        const total = items.length;
        let current = 0;
        let intervalId;
        let isUserInteracting = false;

        function getVisibleCount() {
            return window.innerWidth <= 700 ? 1 : 2;
        }
        function updateSliderPosition() {
            const visible = getVisibleCount();
            const dotCount = Math.ceil(total / visible);

            // Tính toán chỉ số hợp lệ
            if (current >= total) current = 0;
            if (current < 0) current = total - visible;

            // Hiệu ứng trượt - sửa công thức tính toán
            const translatePercent = (current * 100) / visible;
            list.style.transform = `translateX(-${translatePercent}%)`;

            // Quản lý class active-slide
            items.forEach((item, i) => {
                item.classList.remove('active-slide');
            });

            // Thêm class active cho các item hiển thị
            for (let i = current; i < current + visible && i < total; i++) {
                if (items[i]) {
                    items[i].classList.add('active-slide');
                }
            }

            // Dots
            const dotIdx = Math.floor(current / visible);
            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((d, i) => d.classList.toggle('active', i === dotIdx));

            // Ẩn/hiện dots và nút nếu không đủ item
            if (dotCount <= 1) {
                dotsContainer.style.display = 'none';
                if (leftBtn) leftBtn.style.display = 'none';
                if (rightBtn) rightBtn.style.display = 'none';
            } else {
                dotsContainer.style.display = '';
                if (leftBtn) leftBtn.style.display = '';
                if (rightBtn) rightBtn.style.display = '';
            }
        }
        function renderDots() {
            const visible = getVisibleCount();
            const dotCount = Math.ceil(total / visible);
            dotsContainer.innerHTML = '';
            for (let i = 0; i < dotCount; i++) {
                const btn = document.createElement('button');
                btn.addEventListener('click', () => goTo(i * visible));
                dotsContainer.appendChild(btn);
            }
        }
        function goTo(idx) {
            current = idx;
            updateSliderPosition();
            resetAutoSlide();
        }
        function next() {
            const visible = getVisibleCount();
            current += visible;
            if (current >= total) {
                current = 0;
            }
            updateSliderPosition();
        }
        function prev() {
            const visible = getVisibleCount();
            current -= visible;
            if (current < 0) {
                current = Math.max(0, total - visible);
            }
            updateSliderPosition();
        }
        function resetAutoSlide() {
            if (isUserInteracting) return;
            clearInterval(intervalId);
            intervalId = setInterval(next, 4000);
        }

        function pauseAutoSlide() {
            isUserInteracting = true;
            clearInterval(intervalId);
        }

        function resumeAutoSlide() {
            isUserInteracting = false;
            resetAutoSlide();
        }

        renderDots();
        updateSliderPosition();
        intervalId = setInterval(next, 4000);

        // Pause auto-slide on user interaction
        slider.addEventListener('mouseenter', pauseAutoSlide);
        slider.addEventListener('mouseleave', resumeAutoSlide);

        // Event listeners for controls
        if (leftBtn) leftBtn.addEventListener('click', () => {
            pauseAutoSlide();
            prev();
            setTimeout(resumeAutoSlide, 3000); // Resume after 3 seconds
        });

        if (rightBtn) rightBtn.addEventListener('click', () => {
            pauseAutoSlide();
            next();
            setTimeout(resumeAutoSlide, 3000); // Resume after 3 seconds
        });

        // Pause on dot click
        document.addEventListener('click', (e) => {
            if (e.target.matches('.testimonial-dots button')) {
                pauseAutoSlide();
                setTimeout(resumeAutoSlide, 3000);
            }
        });
        window.addEventListener('resize', () => {
            renderDots();
            updateSliderPosition();
        });
    }
    initTestimonialCarousel();

    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        // Hiển thị/ẩn nút dựa trên scroll position
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Smooth scroll về đầu trang
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Sự kiện scroll
        window.addEventListener('scroll', toggleBackToTop);

        // Sự kiện click
        backToTopBtn.addEventListener('click', scrollToTop);

        // Khởi tạo trạng thái ban đầu
        toggleBackToTop();
    }
    initBackToTop();

    // FAQ Accordion Functionality
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                const isExpanded = item.getAttribute('aria-expanded') === 'true';

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                item.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
            });
        });
    }
    initFAQ();

    // Auto-update Copyright Year
    function updateCopyright() {
        const copyrightElements = document.querySelectorAll('footer p');
        const currentYear = new Date().getFullYear();

        copyrightElements.forEach(element => {
            if (element.textContent.includes('©') && element.textContent.includes('Đinh Khánh Tùng')) {
                element.textContent = `© ${currentYear} Đinh Khánh Tùng. All rights reserved.`;
            }
        });
    }
    updateCopyright();

    // Social Sharing removed as requested

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Performance optimization: Lazy load images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    initLazyLoading();



    // Add loading animation for better UX
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Add subtle entrance animations to sections
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            sectionObserver.observe(section);
        });
    });
});
