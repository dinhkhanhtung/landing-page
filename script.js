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

    // Simple Mobile Menu Functionality
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

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
            mobileMenuOverlay.style.display = 'block';
            mobileMenu.classList.add('active');
            document.body.classList.add('mobile-menu-open');

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.style.display = 'none';
            mobileMenu.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');

            // Restore body scroll
            document.body.style.overflow = '';
        }

        // Event listeners
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking on overlay
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking on close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking on nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');

                // If it's a hash link, scroll to section
                if (href && href.startsWith('#')) {
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
                } else {
                    // For non-hash links, just close the menu
                    closeMobileMenu();
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
            if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
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

    // Blog Modal Functionality
    function initBlogModal() {
        // Blog content data
        const blogContent = {
            'tiktok': {
                title: 'Bí quyết xây dựng thương hiệu cá nhân mạnh mẽ trên TikTok',
                content: `
                    <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Montserrat', Arial, sans-serif;">
                        <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80"
                             alt="TikTok Marketing" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 30px;">

                        <h2 style="color: #1e88e5; margin-bottom: 20px; font-size: 2rem;">Bí quyết xây dựng thương hiệu cá nhân mạnh mẽ trên TikTok</h2>

                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 25px; color: #333;">
                            TikTok không chỉ là nền tảng giải trí mà còn là công cụ xây dựng thương hiệu cá nhân mạnh mẽ.
                            Với hơn 1 tỷ người dùng hoạt động hàng tháng, TikTok mang đến cơ hội tiếp cận khách hàng tiềm năng
                            một cách tự nhiên và chân thực.
                        </p>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">1. Xác định Niche phù hợp</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Việc đầu tiên và quan trọng nhất là xác định rõ ràng lĩnh vực bạn muốn phát triển.
                            Hãy chọn một niche mà bạn có đam mê và kiến thức, đồng thời có tiềm năng phát triển trên TikTok.
                        </p>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">2. Tạo Content Viral</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Content trên TikTok cần ngắn gọn, hấp dẫn và có tính lan truyền cao. Tập trung vào:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Hook trong 3 giây đầu tiên</li>
                            <li style="margin-bottom: 10px; color: #333;">Giá trị thực tế cho người xem</li>
                            <li style="margin-bottom: 10px; color: #333;">Hashtag phù hợp và trending</li>
                            <li style="margin-bottom: 10px; color: #333;">Âm nhạc và hiệu ứng bắt mắt</li>
                        </ul>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">3. Xây dựng Cộng đồng</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Tương tác với người xem là chìa khóa xây dựng cộng đồng trung thành. Hãy trả lời comment,
                            tạo các chuỗi series và khuyến khích user-generated content.
                        </p>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">4. Monetization</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Khi đã có lượng follower ổn định, bạn có thể kiếm tiền thông qua:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">TikTok Creator Fund</li>
                            <li style="margin-bottom: 10px; color: #333;">Brand partnerships</li>
                            <li style="margin-bottom: 10px; color: #333;">Bán sản phẩm/dịch vụ riêng</li>
                            <li style="margin-bottom: 10px; color: #333;">Live streaming gifts</li>
                        </ul>

                        <div style="background: #e3f2fd; padding: 25px; border-radius: 12px; margin-top: 30px; border-left: 4px solid #1e88e5;">
                            <h4 style="color: #1565c0; margin-bottom: 15px;">💡 Lời khuyên từ chuyên gia:</h4>
                            <p style="margin: 0; font-size: 1.1rem; color: #333; font-style: italic;">
                                "Hãy kiên trì và chân thực. TikTok ưu tiên content có giá trị và sự kết nối thật sự với cộng đồng.
                                Đừng chạy theo trend mà hãy tạo ra trend của riêng mình."
                            </p>
                            <p style="margin: 15px 0 0 0; font-weight: bold; color: #1e88e5;">- Đinh Khánh Tùng -</p>
                        </div>

                        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                            <p style="color: #666; font-size: 1rem;">
                                Bạn cần tư vấn về TikTok Marketing?
                                <a href="#contact" style="color: #1e88e5; text-decoration: none; font-weight: bold;">Liên hệ ngay →</a>
                            </p>
                        </div>
                    </div>
                `
            },
            'facebook-ads': {
                title: 'Tối ưu hóa chiến dịch Facebook Ads: Từ A đến Z',
                content: `
                    <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Montserrat', Arial, sans-serif;">
                        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                             alt="Facebook Ads" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 30px;">

                        <h2 style="color: #1e88e5; margin-bottom: 20px; font-size: 2rem;">Tối ưu hóa chiến dịch Facebook Ads: Từ A đến Z cho người mới bắt đầu</h2>

                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 25px; color: #333;">
                            Facebook Ads là công cụ mạnh mẽ giúp doanh nghiệp tiếp cận đúng khách hàng mục tiêu.
                            Tuy nhiên, để đạt hiệu quả cao nhất, bạn cần hiểu rõ cách tối ưu hóa chiến dịch một cách bài bản.
                        </p>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">1. Nghiên cứu Audience Insights</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Trước khi chạy quảng cáo, hãy dành thời gian nghiên cứu kỹ về đối tượng mục tiêu:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Tuổi tác, giới tính, vị trí địa lý</li>
                            <li style="margin-bottom: 10px; color: #333;">Sở thích và hành vi trực tuyến</li>
                            <li style="margin-bottom: 10px; color: #333;">Thời gian hoạt động trên Facebook</li>
                            <li style="margin-bottom: 10px; color: #333;">Các page tương tự họ đã like</li>
                        </ul>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">2. Thiết kế Landing Page tối ưu</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Landing page quyết định tỷ lệ chuyển đổi. Đảm bảo:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Loading speed dưới 3 giây</li>
                            <li style="margin-bottom: 10px; color: #333;">Mobile-responsive design</li>
                            <li style="margin-bottom: 10px; color: #333;">Clear call-to-action</li>
                            <li style="margin-bottom: 10px; color: #333;">Thông tin liên hệ rõ ràng</li>
                        </ul>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">3. A/B Testing</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Luôn test các yếu tố khác nhau để tìm ra phiên bản tốt nhất:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Headline và copy khác nhau</li>
                            <li style="margin-bottom: 10px; color: #333;">Hình ảnh và video</li>
                            <li style="margin-bottom: 10px; color: #333;">Đối tượng mục tiêu</li>
                            <li style="margin-bottom: 10px; color: #333;">Thời gian chạy quảng cáo</li>
                        </ul>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">4. Theo dõi và Tối ưu</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Theo dõi các chỉ số quan trọng và điều chỉnh kịp thời:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Click-through rate (CTR)</li>
                            <li style="margin-bottom: 10px; color: #333;">Cost per click (CPC)</li>
                            <li style="margin-bottom: 10px; color: #333;">Conversion rate</li>
                            <li style="margin-bottom: 10px; color: #333;">Return on ad spend (ROAS)</li>
                        </ul>

                        <div style="background: #e8f5e8; padding: 25px; border-radius: 12px; margin-top: 30px; border-left: 4px solid #43a047;">
                            <h4 style="color: #2e7d32; margin-bottom: 15px;">📊 Case Study thực tế:</h4>
                            <p style="margin: 0; font-size: 1.1rem; color: #333;">
                                "Sau khi tối ưu Facebook Ads cho shop thời trang, doanh số tăng 300% chỉ sau 2 tháng.
                                Bí quyết nằm ở việc target đúng đối tượng và A/B testing liên tục."
                            </p>
                        </div>

                        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                            <p style="color: #666; font-size: 1rem;">
                                Cần hỗ trợ chạy Facebook Ads hiệu quả?
                                <a href="#contact" style="color: #1e88e5; text-decoration: none; font-weight: bold;">Liên hệ ngay →</a>
                            </p>
                        </div>
                    </div>
                `
            },
            'doanh-nghiep': {
                title: 'Chiến lược xây dựng kênh số bền vững cho doanh nghiệp nhỏ',
                content: `
                    <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Montserrat', Arial, sans-serif;">
                        <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
                             alt="Digital Business" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 30px;">

                        <h2 style="color: #1e88e5; margin-bottom: 20px; font-size: 2rem;">Chiến lược xây dựng kênh số bền vững cho doanh nghiệp nhỏ</h2>

                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 25px; color: #333;">
                            Trong thời đại số hóa, việc xây dựng kênh số bền vững là yếu tố sống còn cho doanh nghiệp nhỏ.
                            Không cần ngân sách lớn, chỉ cần chiến lược đúng đắn và kiên trì thực hiện.
                        </p>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">1. Xây dựng nền tảng Online</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Bắt đầu từ những nền tảng cơ bản và phù hợp với ngân sách:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Website hoặc landing page đơn giản</li>
                            <li style="margin-bottom: 10px; color: #333;">Fanpage Facebook chuyên nghiệp</li>
                            <li style="margin-bottom: 10px; color: #333;">Zalo Official Account</li>
                            <li style="margin-bottom: 10px; color: #333;">Google My Business</li>
                        </ul>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">2. Content Marketing</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Nội dung là cầu nối giữa doanh nghiệp và khách hàng:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Bài viết chia sẻ kiến thức chuyên môn</li>
                            <li style="margin-bottom: 10px; color: #333;">Hình ảnh sản phẩm/dịch vụ chất lượng</li>
                            <li style="margin-bottom: 10px; color: #333;">Video giới thiệu doanh nghiệp</li>
                            <li style="margin-bottom: 10px; color: #333;">Khách hàng nói gì về bạn</li>
                        </ul>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">3. Tương tác với Khách hàng</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Xây dựng mối quan hệ lâu dài với khách hàng:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Trả lời comment và tin nhắn nhanh chóng</li>
                            <li style="margin-bottom: 10px; color: #333;">Tổ chức minigame và giveaway</li>
                            <li style="margin-bottom: 10px; color: #333;">Gửi lời cảm ơn và chăm sóc sau mua</li>
                            <li style="margin-bottom: 10px; color: #333;">Tạo nhóm cộng đồng khách hàng VIP</li>
                        </ul>

                        <h3 style="color: #1565c0; margin: 30px 0 15px 0; font-size: 1.4rem;">4. Đo lường và Cải thiện</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; color: #333;">
                            Theo dõi hiệu quả và điều chỉnh kịp thời:
                        </p>
                        <ul style="margin-bottom: 25px; padding-left: 20px;">
                            <li style="margin-bottom: 10px; color: #333;">Lượt reach và engagement</li>
                            <li style="margin-bottom: 10px; color: #333;">Website traffic và conversion</li>
                            <li style="margin-bottom: 10px; color: #333;">Doanh số từ kênh online</li>
                            <li style="margin-bottom: 10px; color: #333;">Feedback từ khách hàng</li>
                        </ul>

                        <div style="background: #fff3e0; padding: 25px; border-radius: 12px; margin-top: 30px; border-left: 4px solid #f57c00;">
                            <h4 style="color: #ef6c00; margin-bottom: 15px;">🏆 Thành công từ thực tế:</h4>
                            <p style="margin: 0; font-size: 1.1rem; color: #333;">
                                "Đã tư vấn cho hơn 100 doanh nghiệp nhỏ chuyển đổi số thành công.
                                Doanh nghiệp nhỏ nhất bắt đầu với ngân sách 2 triệu/tháng và đạt được lợi nhuận ổn định chỉ sau 3 tháng."
                            </p>
                        </div>

                        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                            <p style="color: #666; font-size: 1rem;">
                                Doanh nghiệp bạn cần chuyển đổi số?
                                <a href="#contact" style="color: #1e88e5; text-decoration: none; font-weight: bold;">Liên hệ ngay →</a>
                            </p>
                        </div>
                    </div>
                `
            }
        };

        // Create modal if not exists
        if (!document.querySelector('.blog-modal-overlay')) {
            const modalHtml = `
                <div class="blog-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); display: none; z-index: 3000; padding: 20px;">
                    <div class="blog-modal-content" style="background: white; max-width: 900px; margin: 0 auto; max-height: 90vh; overflow-y: auto; border-radius: 16px; position: relative;">
                        <button class="blog-modal-close" style="position: absolute; top: 20px; right: 20px; background: #1e88e5; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; z-index: 3001; display: flex; align-items: center; justify-content: center;">&times;</button>
                        <div class="blog-modal-body" style="padding: 40px;"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        const modalOverlay = document.querySelector('.blog-modal-overlay');
        const modalContent = document.querySelector('.blog-modal-body');
        const modalClose = document.querySelector('.blog-modal-close');

        // Open modal function
        function openBlogModal(blogType) {
            const blog = blogContent[blogType];
            if (blog) {
                modalContent.innerHTML = `
                    <h2 style="color: #1e88e5; margin-bottom: 30px; font-size: 2.2rem; text-align: center;">${blog.title}</h2>
                    ${blog.content}
                `;
                modalOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        // Close modal function
        function closeBlogModal() {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }

        // Event listeners
        modalClose.addEventListener('click', closeBlogModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeBlogModal();
        });

        // Add click handlers to blog buttons
        document.querySelectorAll('.blog-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const blogItem = button.closest('.blog-item');
                const blogType = blogItem?.dataset.blog;
                if (blogType && blogContent[blogType]) {
                    openBlogModal(blogType);
                }
            });
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                closeBlogModal();
            }
        });
    }
    initBlogModal();

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
