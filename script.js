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
            // Tính toán chỉ số hợp lệ
            if (current > total - visible) current = 0;
            // Hiệu ứng trượt
            list.style.transform = `translateX(-${(current / visible) * 100}%)`;
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
            if (current > total - visible) current = 0;
            updateSliderPosition();
        }
        function prev() {
            const visible = getVisibleCount();
            current = (current - visible + total) % total;
            if (current < 0) current = total - visible;
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

    // Blog Modal
    function initBlogModal() {
        const blogModalOverlay = document.getElementById('blogModalOverlay');
        const blogModalCloseBtn = document.getElementById('blogModalCloseBtn');
        const blogModalOkBtn = document.getElementById('blogModalOkBtn');
        const blogModalImage = document.getElementById('blogModalImage');
        const blogModalTitle = document.getElementById('blogModalTitle');
        const blogModalContent = document.getElementById('blogModalContent');
        const blogLinks = document.querySelectorAll('.blog-link');

        const blogData = {
            1: {
                title: "Bí quyết xây dựng thương hiệu cá nhân mạnh mẽ trên TikTok",
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=400&q=80",
                content: `
                    <p>TikTok đã trở thành nền tảng mạng xã hội phát triển nhanh nhất hiện nay với hơn 1 tỷ người dùng toàn cầu. Đây là cơ hội vàng để xây dựng thương hiệu cá nhân mạnh mẽ.</p>
                    
                    <h4>1. Xác định định vị thương hiệu</h4>
                    <p>Trước khi bắt đầu, bạn cần xác định rõ:</p>
                    <ul>
                        <li>Bạn là ai và muốn được biết đến như thế nào?</li>
                        <li>Đối tượng khán giả mục tiêu của bạn là ai?</li>
                        <li>Giá trị độc đáo bạn mang lại là gì?</li>
                    </ul>

                    <h4>2. Tạo nội dung nhất quán</h4>
                    <p>Nội dung trên TikTok cần:</p>
                    <ul>
                        <li>Phù hợp với định vị thương hiệu</li>
                        <li>Mang tính giải trí và giáo dục</li>
                        <li>Đăng tải đều đặn, tối thiểu 3-5 video/tuần</li>
                    </ul>

                    <h4>3. Tận dụng xu hướng</h4>
                    <p>Tham gia các challenge, sử dụng trending hashtags và âm nhạc để tăng khả năng tiếp cận.</p>

                    <h4>4. Tương tác với cộng đồng</h4>
                    <p>Trả lời comment, follow back, và tương tác với các creator khác để xây dựng mạng lưới.</p>

                    <p><strong>Kết quả:</strong> Với chiến lược đúng đắn, bạn có thể xây dựng được cộng đồng trung thành và tăng nhận diện thương hiệu cá nhân một cách hiệu quả.</p>
                `
            },
            2: {
                title: "Tối ưu hóa chiến dịch Facebook Ads: Từ A đến Z cho người mới bắt đầu",
                image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
                content: `
                    <p>Facebook Ads là công cụ quảng cáo mạnh mẽ giúp doanh nghiệp tiếp cận khách hàng tiềm năng. Dưới đây là hướng dẫn chi tiết từ A đến Z.</p>
                    
                    <h4>1. Thiết lập tài khoản Facebook Business</h4>
                    <ul>
                        <li>Tạo Facebook Business Manager</li>
                        <li>Kết nối Facebook Page</li>
                        <li>Thiết lập Facebook Pixel</li>
                    </ul>

                    <h4>2. Xác định mục tiêu chiến dịch</h4>
                    <p>Các mục tiêu phổ biến:</p>
                    <ul>
                        <li>Nhận diện thương hiệu (Brand Awareness)</li>
                        <li>Tăng tương tác (Engagement)</li>
                        <li>Chuyển đổi (Conversions)</li>
                        <li>Bán hàng (Sales)</li>
                    </ul>

                    <h4>3. Tạo đối tượng mục tiêu</h4>
                    <p>Sử dụng Facebook Audience Insights để:</p>
                    <ul>
                        <li>Phân tích đối tượng hiện tại</li>
                        <li>Tạo Lookalike Audiences</li>
                        <li>Custom Audiences từ danh sách khách hàng</li>
                    </ul>

                    <h4>4. Thiết kế creative hấp dẫn</h4>
                    <ul>
                        <li>Hình ảnh/video chất lượng cao</li>
                        <li>Copy quảng cáo ngắn gọn, rõ ràng</li>
                        <li>Call-to-action mạnh mẽ</li>
                    </ul>

                    <h4>5. Tối ưu và theo dõi</h4>
                    <p>Theo dõi các chỉ số quan trọng: CTR, CPC, ROAS và điều chỉnh chiến dịch dựa trên dữ liệu thực tế.</p>
                `
            },
            3: {
                title: "Chiến lược xây dựng kênh số bền vững cho doanh nghiệp nhỏ",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
                content: `
                    <p>Doanh nghiệp nhỏ cần chiến lược kênh số thông minh để phát triển bền vững với ngân sách hạn chế.</p>
                    
                    <h4>1. Đánh giá hiện trạng</h4>
                    <ul>
                        <li>Phân tích điểm mạnh, yếu của doanh nghiệp</li>
                        <li>Xác định đối tượng khách hàng mục tiêu</li>
                        <li>Đánh giá nguồn lực hiện có</li>
                    </ul>

                    <h4>2. Lựa chọn kênh phù hợp</h4>
                    <p>Không cần có mặt trên tất cả nền tảng, hãy tập trung vào:</p>
                    <ul>
                        <li>Facebook: Phù hợp với B2C, địa phương</li>
                        <li>Google My Business: Tối ưu cho tìm kiếm địa phương</li>
                        <li>Website: Trung tâm thông tin và bán hàng</li>
                    </ul>

                    <h4>3. Xây dựng nội dung có giá trị</h4>
                    <ul>
                        <li>Chia sẻ kiến thức chuyên môn</li>
                        <li>Kể câu chuyện thương hiệu</li>
                        <li>Tương tác với khách hàng</li>
                    </ul>

                    <h4>4. Tự động hóa quy trình</h4>
                    <p>Sử dụng các công cụ miễn phí/giá rẻ:</p>
                    <ul>
                        <li>Chatbot Facebook Messenger</li>
                        <li>Email marketing tự động</li>
                        <li>Lên lịch đăng bài</li>
                    </ul>

                    <h4>5. Đo lường và cải thiện</h4>
                    <p>Theo dõi các KPI quan trọng và điều chỉnh chiến lược dựa trên kết quả thực tế.</p>
                `
            }
        };

        function showBlogModal(blogId) {
            const blog = blogData[blogId];
            if (!blog) return;

            blogModalImage.src = blog.image;
            blogModalImage.alt = blog.title;
            blogModalTitle.textContent = blog.title;
            blogModalContent.innerHTML = blog.content;
            
            blogModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function hideBlogModal() {
            blogModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event listeners
        const blogItems = document.querySelectorAll('.blog-item');
        
        blogItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const blogId = this.getAttribute('data-blog');
                showBlogModal(blogId);
            });
        });

        blogLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Ngăn event bubbling
                const blogId = this.getAttribute('data-blog');
                showBlogModal(blogId);
            });
        });

        blogModalCloseBtn.addEventListener('click', hideBlogModal);
        blogModalOkBtn.addEventListener('click', hideBlogModal);
        blogModalOverlay.addEventListener('click', function(e) {
            if (e.target === blogModalOverlay) hideBlogModal();
        });
    }

    initBlogModal();

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
});
