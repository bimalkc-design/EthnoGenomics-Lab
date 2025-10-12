// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu-compact');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Dynamic Hero Gallery (Subtle Motion)
    const dynamicGallery = document.querySelector('.dynamic-hero-gallery');
    const galleryImages = [
        'images/gallery/fieldwork_1.jpg',
        'images/gallery/lab_1.jpg',
        'images/gallery/plant_species_1.jpg',
        'images/gallery/bhutan_landscape.jpg'
    ];
    let currentGalleryIndex = 0;

    function createDynamicGallery() {
        if (!dynamicGallery) return;
        galleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Lab Image ${index + 1}`;
            if (index === 0) img.classList.add('active');
            dynamicGallery.appendChild(img);
        });
    }

    function cycleGalleryImages() {
        if (!dynamicGallery) return;
        const images = dynamicGallery.querySelectorAll('img');
        images[currentGalleryIndex].classList.remove('active');
        currentGalleryIndex = (currentGalleryIndex + 1) % images.length;
        images[currentGalleryIndex].classList.add('active');
    }

    if (galleryImages.length > 0 && dynamicGallery) {
        createDynamicGallery();
        setInterval(cycleGalleryImages, 5000); // Change every 5 seconds for subtle effect
    }

    // Publications Loading
    const publications = [
        {
            title: "Chloroplast Genome Sequencing of *Rhododendron arboreum* from the Eastern Himalayas: Insights into Phylogeny and Adaptive Evolution",
            authors: "Chetri, B. K., Sharma, S., & Rai, R.",
            journal: "Journal of Plant Genomics",
            year: "2023",
            link: "https://scholar.google.com/scholar?q=Chloroplast+Genome+Sequencing+Rhododendron+arboreum"
        },
        // Add more as needed...
    ];

    const publicationsList = document.getElementById('publications-list');
    if (publicationsList) {
        publications.forEach(pub => {
            const div = document.createElement('div');
            div.classList.add('publication-item');
            div.innerHTML = `
                <h4>${pub.title}</h4>
                <p><strong>Authors:</strong> ${pub.authors}</p>
                <p><strong>Journal:</strong> ${pub.journal} (${pub.year})</p>
                <a href="${pub.link}" target="_blank" rel="noopener noreferrer">Read More <i class="fas fa-external-link-alt"></i></a>
            `;
            publicationsList.appendChild(div);
        });
    }

    // Tab Functionality for UX
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Current Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Active Nav Link and Smooth Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu-compact a');

    function highlightActiveNavLink() {
        let currentId = '';
        const headerHeight = document.querySelector('.main-header-compact').offsetHeight;
        const scrollPos = window.scrollY + headerHeight + 10;

        sections.forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) link.classList.add('active');
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink();

    document.querySelectorAll('.nav-menu-compact a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = document.querySelector('.main-header-compact').offsetHeight;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
                if (window.innerWidth <= 992) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});
