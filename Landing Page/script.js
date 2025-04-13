document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");
    const tabs = document.querySelectorAll(".application-tabs .tab");
    const images = document.querySelectorAll(".application-image .room-image");
    const productItems = document.querySelectorAll(".product_item");
    const blogItems = document.querySelectorAll(".blog-item");

    // FAQ Toggle Functionality
    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const item = this.parentElement;
            const answer = item.querySelector(".faq-answer");
            const isActive = item.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = "0";
            });

            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Tab Switching for Products - By Application
    const initialTab = document.querySelector(".application-tabs .tab.active");
    const initialRoom = initialTab ? initialTab.getAttribute("data-room") : "bathroom";
    setActiveTab(initialRoom);

    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            const room = tab.getAttribute("data-room");

            tabs.forEach(t => t.classList.remove("active"));
            images.forEach(img => img.classList.remove("active"));

            tab.classList.add("active");
            const activeImage = document.querySelector(`.room-image[data-room="${room}"]`);
            if (activeImage) {
                activeImage.classList.add("active");
            }
        });
    });

    function setActiveTab(room) {
        const activeTab = document.querySelector(`.application-tabs .tab[data-room="${room}"]`);
        const activeImage = document.querySelector(`.application-image .room-image[data-room="${room}"]`);
        if (activeTab && activeImage) {
            activeTab.classList.add("active");
            activeImage.classList.add("active");
        }
    }

    // Animation for Products - By Design
    function animateProductsOnScroll() {
        productItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top >= 0 && rect.top < windowHeight) {
                item.classList.add("visible");
            } else {
                item.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", animateProductsOnScroll);
    window.addEventListener("load", animateProductsOnScroll);

    // Animation for Related Blog
    const relatedBlog = document.querySelector(".related_blog");

    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log("Intersection observed:", entry.isIntersecting); // Debug log
            if (entry.isIntersecting) {
                // Add visible class to trigger animation for each blog item with stagger
                blogItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("visible");
                    }, index * 200); // 200ms delay between each item
                });
            } else {
                // Remove visible class to reset animation when out of view
                blogItems.forEach(item => {
                    item.classList.remove("visible");
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    // Observe the related_blog section
    if (relatedBlog) {
        blogObserver.observe(relatedBlog);
    }
});