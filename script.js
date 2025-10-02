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

    // Mobile Menu Functionality
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-menu a');

        if (!mobileMenuBtn || !mobileMenuOverlay || !mobileMenu) return;

        // Toggle mobile menu
        function toggleMobileMenu() {
            const isActive = mobileMenu.classList.contains('active');
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        function openMobileMenu() {
            mobileMenuBtn.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event listeners
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        // Close menu when clicking on nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');

                // If it's a hash link, scroll to section
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        closeMobileMenu();
                        setTimeout(() => {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            updateActiveMenu();
                        }, 300);
                    }
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu on window resize if it gets too wide
        window.addEventListener('resize', () => {
            if (window.innerWidth > 800 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    initMobileMenu();

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

        function getVisibleCount() {
            return window.innerWidth <= 700 ? 1 : 2;
        }
        function updateSliderPosition() {
            const visible = getVisibleCount();
            const dotCount = Math.ceil(total / visible);
            // Tính toán chỉ số hợp lệ
            if (current > total - visible) current = 0;
            // Hiệu ứng trượt
            list.style.transform = `translateX(-${(current / total) * 100}%)`;
            // Quản lý class active-slide
            items.forEach((item, i) => {
                if (i >= current && i < current + visible) {
                    item.classList.add('active-slide');
                } else {
                    item.classList.remove('active-slide');
                }
            });
            // Dots
            const dotIdx = Math.floor(current / visible);
            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((d, i) => d.classList.toggle('active', i === dotIdx));
            // Ẩn/hiện dots và nút nếu không đủ item
            if (dotCount <= 1) {
                dotsContainer.style.display = 'none';
                leftBtn.style.display = 'none';
                rightBtn.style.display = 'none';
            } else {
                dotsContainer.style.display = '';
                leftBtn.style.display = '';
                rightBtn.style.display = '';
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
            current = (current + visible) % total;
            updateSliderPosition();
        }
        function prev() {
            const visible = getVisibleCount();
            current = (current - visible + total) % total;
            updateSliderPosition();
        }
        function resetAutoSlide() {
            clearInterval(intervalId);
            intervalId = setInterval(next, 4000);
        }
        renderDots();
        updateSliderPosition();
        intervalId = setInterval(next, 4000);
        slider.addEventListener('mouseenter', () => clearInterval(intervalId));
        slider.addEventListener('mouseleave', resetAutoSlide);
        if (leftBtn) leftBtn.addEventListener('click', prev);
        if (rightBtn) rightBtn.addEventListener('click', next);
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

    // Social Sharing with Avatar
    function initSocialSharing() {
        const shareUrl = window.location.href;
        const shareTitle = document.title;
        const shareDescription = document.querySelector('meta[name="description"]')?.content || '';
        const avatarUrl = window.location.origin + '/avatar.jpg';

        // Add social sharing buttons to contact section
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            const socialShareHtml = `
                <div class="social-share" style="margin-top: 40px; text-align: center; border-top: 1px solid var(--gray-light); padding-top: 30px;">
                    <h3 style="color: var(--primary); margin-bottom: 20px; font-size: 1.2rem;">Chia sẻ trang này</h3>
                    <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}"
                           target="_blank" class="social-btn facebook"
                           style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: #1877f2; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                            <img src="${avatarUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
                            <i class="fab fa-facebook"></i> Facebook
                        </a>
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}"
                           target="_blank" class="social-btn twitter"
                           style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: #1da1f2; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                            <img src="${avatarUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
                            <i class="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}"
                           target="_blank" class="social-btn linkedin"
                           style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: #0077b5; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">
                            <img src="${avatarUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                    </div>
                </div>
            `;
            contactSection.insertAdjacentHTML('beforeend', socialShareHtml);
        }
    }
    initSocialSharing();

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
