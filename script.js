document.addEventListener('DOMContentLoaded', () => {
    // --- Constants & Configuration ---
    const config = {
        galleryImageBaseUrl: 'images/', // Adjust if images are in a subfolder
        galleryImages: [
            '2.10.jpg',
            '3.5a.jpg',
            '3.5b.jpg',
            '3.6.jpg',
            '4.2.jpg',
            '4.4.jpg',
            '5.0.jpg',
            '5.2.jpg',
            'pp.jpg',
            'research_genomics.jpg'
        ],
        updateImages: [
            { src: 'update1.jpg', caption: 'New publication on Cymbopogon genomics' },
            { src: 'update2.jpg', caption: 'Fieldwork in Himalayan biodiversity' },
            { src: 'update3.jpg', caption: 'Collaboration with global genomics team' }
        ],
        galleryCycleInterval: 5000, // 5 seconds for hero gallery animation
        updateCycleInterval: 4000, // 4 seconds for updates carousel
        scrollOffset: 70,
        googleScholarId: 'Hp0ZnX4AAAAJ',
        linkedInProfile: 'https://www.linkedin.com/in/bimal-k-chetri-ph-d-a6b840a5/'
    };

    const selectors = {
        navToggle: '.nav-toggle',
        navMenu: '.nav-menu-compact',
        dynamicGallery: '.dynamic-hero-gallery',
        publicationsList: '#publications-list',
        tabButtons: '.tab-button',
        tabPanes: '.tab-pane',
        scrollToTopBtn: '#scrollToTopBtn',
        currentYearSpan: '#current-year',
        sections: 'section[id]',
        navLinks: '.nav-menu-compact a[href^="#"]',
        googleScholarLink: 'a[href*="scholar.google.com"]',
        updateCarousel: '#recent-updates-carousel',
        updateIndicators: '#update-carousel-indicators'
    };

    const elements = {};
    for (const key in selectors) {
        const found = document.querySelectorAll(selectors[key]);
        elements[key] = found.length === 1 ? found[0] : found;
    }

    // --- Utility Functions ---
    function smoothScrollTo(target) {
        if (target) {
            const header = document.querySelector('.main-header-compact');
            const offset = header ? header.offsetHeight : config.scrollOffset;
            const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    }

    // --- Navigation & Header ---
    function initMobileNav() {
        if (elements.navToggle && elements.navMenu) {
            elements.navToggle.addEventListener('click', () => {
                const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
                elements.navToggle.setAttribute('aria-expanded', !isExpanded);
                elements.navMenu.classList.toggle('open');
            });

            document.addEventListener('click', (event) => {
                if (
                    !elements.navMenu.contains(event.target) &&
                    !elements.navToggle.contains(event.target) &&
                    elements.navMenu.classList.contains('open')
                ) {
                    elements.navMenu.classList.remove('open');
                    elements.navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    function highlightActiveNavLink() {
        let currentId = '';
        const headerHeight = document.querySelector('.main-header-compact')?.offsetHeight || config.scrollOffset;
        const scrollPos = window.scrollY + headerHeight + 10;

        elements.sections.forEach((section) => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                currentId = section.id;
            }
        });

        Array.from(elements.navLinks).forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }

    function initSmoothScrolling() {
        Array.from(elements.navLinks).forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                smoothScrollTo(target);

                if (window.innerWidth <= 992 && elements.navMenu.classList.contains('open')) {
                    elements.navMenu.classList.remove('open');
                    elements.navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Dynamic Hero Gallery ---
    function createDynamicGallery() {
        if (!elements.dynamicGallery || config.galleryImages.length === 0) {
            console.warn('Dynamic gallery container not found or no images provided.');
            return;
        }

        elements.dynamicGallery.innerHTML = '';
        const totalImages = config.galleryImages.length;
        const animationDuration = config.galleryCycleInterval / 1000;

        config.galleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            const fullSrc = config.galleryImageBaseUrl + src;
            img.src = fullSrc;
            img.alt = `Lab Image ${index + 1}`;
            img.loading = 'lazy';
            img.classList.add('gallery-image');
            img.style.animation = `floatAndFade ${animationDuration}s infinite ease-in-out`;
            img.style.animationDelay = `${(index * animationDuration) / totalImages}s`;

            img.onerror = () => {
                console.error(`Failed to load hero image: ${fullSrc}`);
                img.style.display = 'none';
            };
            img.onload = () => {
                console.log(`Hero image loaded: ${fullSrc}`);
            };

            elements.dynamicGallery.appendChild(img);
        });
    }

    function initDynamicGallery() {
        if (config.galleryImages.length > 0 && elements.dynamicGallery) {
            createDynamicGallery();
        } else {
            console.warn('Hero gallery initialization skipped.');
        }
    }

    // --- Recent Updates Carousel ---
    function createUpdateCarousel() {
        if (!elements.updateCarousel || !elements.updateIndicators || config.updateImages.length === 0) {
            console.warn('Update carousel or indicators not found, or no update images provided.');
            return;
        }

        elements.updateCarousel.innerHTML = '';
        elements.updateIndicators.innerHTML = '';
        const totalImages = config.updateImages.length;

        // Create carousel items
        config.updateImages.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('carousel-item');
            if (index === 0) div.classList.add('active');
            div.innerHTML = `
                <img src="${config.galleryImageBaseUrl}${item.src}" alt="${item.caption}" loading="lazy">
                <p class="carousel-caption">${item.caption}</p>
            `;
            elements.updateCarousel.appendChild(div);

            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dot.addEventListener('click', () => setActiveCarouselItem(index));
            elements.updateIndicators.appendChild(dot);

            div.onerror = () => {
                console.error(`Failed to load update image: ${config.galleryImageBaseUrl}${item.src}`);
                div.style.display = 'none';
            };
        });

        // Auto-cycle carousel
        let currentIndex = 0;
        function setActiveCarouselItem(index) {
            const items = elements.updateCarousel.querySelectorAll('.carousel-item');
            const dots = elements.updateIndicators.querySelectorAll('.carousel-dot');
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
                dots[i].classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            setActiveCarouselItem(currentIndex);
        }, config.updateCycleInterval);
    }

    function initUpdateCarousel() {
        if (config.updateImages.length > 0 && elements.updateCarousel) {
            createUpdateCarousel();
        } else {
            console.warn('Update carousel initialization skipped.');
        }
    }

    // --- Publications Section ---
    const publications = [
        {
            title: "De novo plastome assembly of Cymbopogon bhutanicus Noltie, an endemic lemon grass from Bhutan, with geospatial, comparative genomic, and phylogenetic insights",
            authors: "Mohan Singh Rana, Nicolas Dierckxsens, Pritesh Bhatt, Bimal K Chetri",
            journal: "Ecological Genetics and Genomics",
            year: "2025",
            link: "https://doi.org/10.1016/j.egg.2025.100372"
        },
        {
            title: "Plastome genomics of the crop wild relative Thladiantha cordifolia illuminates the evolution and phylogeny of the gourd family (Cucurbitaceae)",
            authors: "Bimal K Chetri, SS Sonu, Rahul G Shelke, Sudip Mitra, Lata Rangan",
            journal: "Genetic Resources and Crop Evolution",
            year: "2025",
            link: "https://link.springer.com/article/10.1007/s10722-025-02579-6"
        },
        {
            title: "Ethnomedicinal Practices in Kilikhar, Mongar",
            authors: "Bimal K Chetri, K., Phuntsho Wangdi, Tshering Penjor",
            journal: "Asian Plant Research Journal",
            year: "2018",
            link: "https://d1wqtxts1xzle7.cloudfront.net/59067833/Chetri122018APRJ4578620190428-37384-8w2tn0-libre.pdf"
        },
        {
            title: "Insights into cucurbitaceae mitogenomes: gene length variation, correlation features, and phylogenetic relationship",
            authors: "Bimal K Chetri, SS Sonu, Nicolas Dierckxsens, Sudip Mitra, Latha Rangan",
            journal: "Journal of Plant Biochemistry and Biotechnology",
            year: "2025",
            link: "https://link.springer.com/article/10.1007/s40009-025-01633-2"
        },
        {
            title: "In-vitro and in-silico evaluation of antimicrobial and antibiofilm secondary metabolites of a novel fungal endophyte, Albophoma sp. BAPR5",
            authors: "Jintu Rabha, Bimal Kumar Chetri, Sukanya Das, Dhruva Kumar Jha",
            journal: "South African Journal of Botany",
            year: "2023",
            link: "https://doi.org/10.1016/j.sajb.2023.05.033"
        }
    ];

    function loadPublications() {
        if (!elements.publicationsList) {
            console.warn('Publications list container not found.');
            return;
        }

        elements.publicationsList.innerHTML = '';
        publications.forEach((pub) => {
            const div = document.createElement('div');
            div.classList.add('publication-item');
            div.innerHTML = `
                <i class="fas fa-book"></i>
                <div class="publication-info">
                    <h4>${pub.title}</h4>
                    <p><strong>Authors:</strong> ${pub.authors}</p>
                    <p><strong>Journal:</strong> ${pub.journal} (${pub.year})</p>
                    <a href="${pub.link}" target="_blank" rel="noopener noreferrer">Read More <i class="fas fa-external-link-alt"></i></a>
                </div>
            `;
            elements.publicationsList.appendChild(div);
        });
    }

    // --- Tab Functionality ---
    function initTabs() {
        Array.from(elements.tabButtons).forEach((button) => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                Array.from(elements.tabButtons).forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');

                Array.from(elements.tabPanes).forEach((pane) => pane.classList.remove('active'));
                const activePane = document.getElementById(tabId);
                if (activePane) activePane.classList.add('active');
            });
        });
        if (elements.tabButtons.length > 0 && elements.tabPanes.length > 0) {
            elements.tabButtons[0].click();
        }
    }

    // --- Scroll to Top Button ---
    function initScrollToTop() {
        if (elements.scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                elements.scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
            });
            elements.scrollToTopBtn.addEventListener('click', () =>
                window.scrollTo({ top: 0, behavior: 'smooth' })
            );
        }
    }

    // --- Footer & Dynamic Content ---
    function setCurrentYear() {
        if (elements.currentYearSpan) {
            elements.currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    function updateDynamicLinks() {
        const googleScholarBaseUrl = 'https://scholar.google.com/citations?user=';
        if (
            elements.googleScholarLink &&
            config.googleScholarId &&
            config.googleScholarId !== 'YOUR_GOOGLE_SCHOLAR_ID'
        ) {
            elements.googleScholarLink.forEach((link) => {
                if (
                    link.href.startsWith(googleScholarBaseUrl) ||
                    link.href === 'https://scholar.google.com/citations?hl=ro&user=Hp0ZnX4AAAAJ'
                ) {
                    link.href = googleScholarBaseUrl + config.googleScholarId;
                }
            });
        }

        const contactGrid = document.querySelector('.contact-grid-mini');
        if (contactGrid && config.linkedInProfile) {
            if (!contactGrid.querySelector('a[href*="linkedin.com"]')) {
                const linkedInItem = document.createElement('a');
                linkedInItem.href = config.linkedInProfile;
                linkedInItem.target = '_blank';
                linkedInItem.rel = 'noopener noreferrer';
                linkedInItem.classList.add('contact-item-mini');
                linkedInItem.innerHTML = `
                    <i class="fab fa-linkedin"></i>
                    <div class="contact-info-mini">
                        <h4>LinkedIn</h4>
                        <p>View Profile</p>
                    </div>
                `;
                const qrcodeItem = contactGrid.querySelector('.qrcode-item-mini');
                if (qrcodeItem) {
                    contactGrid.insertBefore(linkedInItem, qrcodeItem);
                } else {
                    contactGrid.appendChild(linkedInItem);
                }
            }
        }
    }

    // --- Initialize All Functionalities ---
    function initialize() {
        try {
            initMobileNav();
            initDynamicGallery();
            initUpdateCarousel();
            loadPublications();
            initTabs();
            initScrollToTop();
            setCurrentYear();
            updateDynamicLinks();
            highlightActiveNavLink();
            window.addEventListener('scroll', highlightActiveNavLink);
            initSmoothScrolling();
            console.log('Initialization complete.');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    initialize();
});
