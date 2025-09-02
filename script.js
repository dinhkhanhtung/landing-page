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
            
            if (window.innerWidth <= 700) {
                // Mobile: Hiển thị tất cả cards trong 1 hàng, chỉ highlight card active
                list.style.transform = 'translateX(0)';
                items.forEach((item, i) => {
                    if (i === current) {
                        item.classList.add('active-slide');
                    } else {
                        item.classList.remove('active-slide');
                    }
                });
            } else {
                // Desktop: Hiển thị 2 cards, trượt ngang
                if (current > total - visible) current = 0;
                list.style.transform = `translateX(-${(current / visible) * 100}%)`;
                items.forEach((item, i) => {
                    if (i >= current && i < current + visible) {
                        item.classList.add('active-slide');
                    } else {
                        item.classList.remove('active-slide');
                    }
                });
            }
            
            // Dots
            let dotIdx;
            if (window.innerWidth <= 700) {
                // Mobile: dot active = current card
                dotIdx = current;
            } else {
                // Desktop: dot active = current group
                dotIdx = Math.floor(current / visible);
            }
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
            let dotCount;
            if (window.innerWidth <= 700) {
                // Mobile: 1 dot cho mỗi card
                dotCount = total;
            } else {
                // Desktop: 1 dot cho mỗi 2 cards
                const visible = getVisibleCount();
                dotCount = Math.ceil(total / visible);
            }
            
            dotsContainer.innerHTML = '';
            for (let i = 0; i < dotCount; i++) {
                const btn = document.createElement('button');
                if (window.innerWidth <= 700) {
                    btn.addEventListener('click', () => goTo(i));
                } else {
                    btn.addEventListener('click', () => goTo(i * getVisibleCount()));
                }
                dotsContainer.appendChild(btn);
            }
        }
        function goTo(idx) {
            current = idx;
            updateSliderPosition();
            resetAutoSlide();
        }
        function next() {
            if (window.innerWidth <= 700) {
                // Mobile: chuyển từng card một
                current = (current + 1) % total;
            } else {
                // Desktop: chuyển 2 cards
                const visible = getVisibleCount();
                current = (current + visible) % total;
                if (current > total - visible) current = 0;
            }
            updateSliderPosition();
        }
        function prev() {
            if (window.innerWidth <= 700) {
                // Mobile: chuyển từng card một
                current = (current - 1 + total) % total;
            } else {
                // Desktop: chuyển 2 cards
                const visible = getVisibleCount();
                current = (current - visible + total) % total;
                if (current < 0) current = total - visible;
            }
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



    // Scroll to Top Button
    function initScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initScrollToTop();

    // FAQ Accordion
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Đóng tất cả FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Nếu item hiện tại chưa active, thì mở nó
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    initFAQAccordion();
});
