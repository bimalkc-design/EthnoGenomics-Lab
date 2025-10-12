document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const config = {
        galleryImageBaseUrl: '', // Adjust to 'images/' if needed
        galleryImages: [
            '2.10.jpg', '3.5a.jpg', '3.5b.jpg', '3.6.jpg', '4.2.jpg',
            '4.4.jpg', '5.0.jpg', '5.2.jpg', 'pp.jpg', 'research_genomics.jpg'
        ],
        galleryCycleInterval: 5000,
        scrollOffset: 70,
        googleScholarId: 'Hp0ZnX4AAAAJ',
        linkedInProfile: 'https://www.linkedin.com/in/bimal-k-chetri-ph-d-a6b840a5/',
        updateImageBaseUrl: '', // Adjust to 'updates/' if needed
        recentUpdates: [
            {
                text: "The Royal University of Bhutan - Sherubtse and 'Ovidius' University of Constanţa (Romania) invite you to the scientific lecture 'Bhutan: From Local Wisdom to Sustainable Approach' by Assoc. Prof. Dr. Bimal K. CHETRI. Join us on Thursday, October 9, 2025, 10:00 – 11:00 AM, in room E216, building B, campus.",
                image: "update_1.jpg"
            },
            {
                text: "Dr. Chetri's expertise: high-altitude medicinal plants, genomics, plant flow cytometry, and ecophysiology. Specializing in molecular and ecological study of high-altitude medicinal plants, integrating plant genomics and molecular phylogeny for adaptive mechanisms, therapeutic potential, and conservation strategies.",
                image: "Update_2.jpg"
            },
            {
                text: "Significant contributions to understanding plant adaptation in extreme environments, with extensive publications on plastome and mitogenome analyses, nuclear DNA content estimation, and ethnobotanical research.",
                image: "Update_3.jpg"
            },
            {
                text: "Key Expertise Areas: High-altitude medicinal plants, Genomics, Plant flow cytometry, Molecular phylogeny, Organellar genome mining, Evolutionary dynamics, Ethnobotany, Plant conservation.",
                image: "Update_4.jpg"
            },
            {
                text: "Organizers: Dr. Liviu-Daniel GALAŢCHI & Dr. Bimal-Kumar CHETRI",
                image: "5.0.jpg"
            }
        ],
        updateCarouselInterval: 6000
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
        googleScholarLink: '.googleScholarLink',
        recentUpdatesContainer: '#recent-updates-carousel',
        updateCarouselIndicators: '#update-carousel-indicators',
        contactGridMini: '.contact-grid-mini'
    };

    const elements = {};
    for (const key in selectors) {
        const found = document.querySelectorAll(selectors[key]);
        elements[key] = found.length === 1 ? found[0] : found;
    }

    let updateCarouselIntervalId = null;

    // --- Utility Functions ---
    function smoothScrollTo(target) {
        if (target) {
            const header = document.querySelector('.main-header-compact');
            const offset = header ? header.offsetHeight : config.scrollOffset;
            const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    }

    // --- Navigation ---
    function initMobileNav() {
        if (elements.navToggle && elements.navMenu) {
            elements.navToggle.addEventListener('click', () => {
                const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
                elements.navToggle.setAttribute('aria-expanded', !isExpanded);
                elements.navMenu.classList.toggle('active');
            });

            document.addEventListener('click', (event) => {
                if (!elements.navMenu.contains(event.target) && !elements.navToggle.contains(event.target) && elements.navMenu.classList.contains('active')) {
                    elements.navMenu.classList.remove('active');
                    elements.navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    function highlightActiveNavLink() {
        let currentId = '';
        const header = document.querySelector('.main-header-compact');
        const headerHeight = header ? header.offsetHeight : config.scrollOffset;
        const scrollPos = window.scrollY + headerHeight + 10;

        Array.from(elements.sections).forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                currentId = section.id;
            }
        });

        Array.from(elements.navLinks).forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }

    function initSmoothScrolling() {
        Array.from(elements.navLinks).forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                smoothScrollTo(target);
                if (window.innerWidth <= 768 && elements.navMenu.classList.contains('active')) {
                    elements.navMenu.classList.remove('active');
                    elements.navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Dynamic Hero Gallery ---
    function createDynamicGallery() {
        if (!elements.dynamicGallery || config.galleryImages.length === 0) return;
        elements.dynamicGallery.innerHTML = '';
        config.galleryImages.forEach((imgName, index) => {
            const img = document.createElement('img');
            img.src = config.galleryImageBaseUrl + imgName;
            img.alt = `Lab Image ${index + 1}`;
            img.classList.add('gallery-image');
            img.style.opacity = '0';
            img.style.transition = `opacity 1s ease-in-out ${index * 0.5}s`;
            img.onerror = () => {
                img.src = config.galleryImageBaseUrl + 'placeholder.jpg';
                img.alt = 'Placeholder Image';
            };
            elements.dynamicGallery.appendChild(img);
        });

        setTimeout(() => {
            Array.from(elements.dynamicGallery.children).forEach(img => {
                img.style.opacity = '1';
            });
        }, 100);
    }

    function initDynamicGallery() {
        if (config.galleryImages.length > 0 && elements.dynamicGallery) {
            createDynamicGallery();
        }
    }

    // --- Publications ---
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
            link: "https://d1wqtxts1xzle7.cloudfront.net/59067833/Chetri122018APRJ4578620190428-37384-8w2tn0-libre.pdf?1556505489=&response-content-disposition=inline%3B+filename%3DEthnomedicinal_Practices_in_Kilikhar_Mon.pdf&Expires=1760258951&Signature=K0~XHfL7rt~KHyRb3DbP0D7mkgwyQLWCnFABmOKcKWjQYGXH9jV20DTVsnjtYPnOvVeeRS7INOmg3GVTr7-gXkMTS1El8DKsldrWmSbXuYC801T4RFPRLdTyl0etsNjmyrSkjFBzuYrTWV8oHKkH7r8UR7A~so1l~-DnZjjrEd2ka27gQwv29qoZVJkw~fzUjZIZrm2F8iI0Cku10hQWsqhn2nBtO8trcU-yIcdJ0jAyxSNNOiD9Jx5~2IXuJvsE91HhX47dHsPiDN67Z3LOzIjznaxPFSghoiG-ZNhKuIFSCa-4d5OFManm0IhORzH9ylz4U2pZ0NaEzVG6lAZcyg__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA"
        },
        {
            title: "Insights into cucurbitaceae mitogenomes: gene length variation, correlation features, and phylogenetic relationship",
            authors: "Bimal K Chetri, SS Sonu, Nicolas Dierckxsens, Sudip Mitra, Latha Rangan",
            journal: "Journal of Plant Biochemistry and Biotechnology",
            year: "2025",
            link: "https://link.springer.com/article/10.1007/s13562-025-00992-7"
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
        if (elements.publicationsList) {
            elements.publicationsList.innerHTML = '';
            publications.forEach(pub => {
                const div = document.createElement('div');
                div.classList.add('publication-item');
                div.innerHTML = `
                    <h4>${pub.title}</h4>
                    <p><strong>Authors:</strong> ${pub.authors}</p>
                    <p><strong>Journal:</strong> ${pub.journal} (${pub.year})</p>
                    <a href="${pub.link}" target="_blank" rel="noopener noreferrer">Read More <i class="fas fa-external-link-alt"></i></a>
                `;
                elements.publicationsList.appendChild(div);
            });
        }
    }

    // --- Tabs ---
    function initTabs() {
        if (elements.tabButtons.length > 0 && elements.tabPanes.length > 0) {
            Array.from(elements.tabButtons).forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.getAttribute('data-tab');
                    Array.from(elements.tabButtons).forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    Array.from(elements.tabPanes).forEach(pane => pane.classList.remove('active'));
                    const activePane = document.getElementById(tabId);
                    if (activePane) activePane.classList.add('active');
                });
            });
            elements.tabButtons[0].click();
        }
    }

    // --- Recent Updates Carousel ---
    function setupRecentUpdatesCarousel() {
        if (!elements.recentUpdatesContainer || !elements.updateCarouselIndicators || config.recentUpdates.length === 0) return;

        elements.recentUpdatesContainer.innerHTML = '';
        elements.updateCarouselIndicators.innerHTML = '';

        config.recentUpdates.forEach((update, index) => {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if (index === 0) item.classList.add('active');
            item.innerHTML = `
                <img src="${config.updateImageBaseUrl}${update.image}" alt="Update ${index + 1}" onerror="this.src='${config.updateImageBaseUrl}placeholder.jpg'; this.alt='Placeholder Image';">
                <div class="carousel-caption">
                    <p>${update.text}</p>
                </div>
            `;
            elements.recentUpdatesContainer.appendChild(item);

            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide-to', index);
            indicator.type = 'button';
            elements.updateCarouselIndicators.appendChild(indicator);
        });

        startUpdateCarousel();
    }

    function startUpdateCarousel() {
        const items = elements.recentUpdatesContainer.querySelectorAll('.carousel-item');
        const indicators = elements.updateCarouselIndicators.querySelectorAll('.carousel-indicator');
        let currentIndex = 0;

        if (items.length === 0) return;

        const showSlide = (index) => {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        };

        if (updateCarouselIntervalId) clearInterval(updateCarouselIntervalId);
        updateCarouselIntervalId = setInterval(nextSlide, config.updateCarouselInterval);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
                clearInterval(updateCarouselIntervalId);
                updateCarouselIntervalId = setInterval(nextSlide, config.updateCarouselInterval);
            });
        });
    }

    // --- Scroll to Top ---
    function initScrollToTop() {
        if (elements.scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                elements.scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
            });
            elements.scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // --- Footer & Links ---
    function setCurrentYear() {
        if (elements.currentYearSpan) {
            elements.currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    function updateDynamicLinks() {
        const googleScholarBaseUrl = 'https://scholar.google.com/citations?user=';
        if (config.googleScholarId && elements.googleScholarLink) {
            Array.from(elements.googleScholarLink).forEach(link => {
                link.href = googleScholarBaseUrl + config.googleScholarId;
            });
        }

        if (elements.contactGridMini && config.linkedInProfile) {
            if (!elements.contactGridMini.querySelector('a[href*="linkedin.com"]')) {
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
                const qrcodeItem = elements.contactGridMini.querySelector('.qrcode-item-mini');
                if (qrcodeItem) {
                    elements.contactGridMini.insertBefore(linkedInItem, qrcodeItem);
                } else {
                    elements.contactGridMini.appendChild(linkedInItem);
                }
            }
        }
    }

    // --- Initialize ---
    function initialize() {
        initMobileNav();
        initDynamicGallery();
        loadPublications();
        initTabs();
        setupRecentUpdatesCarousel();
        initScrollToTop();
        setCurrentYear();
        updateDynamicLinks();
        highlightActiveNavLink();
        window.addEventListener('scroll', highlightActiveNavLink);
        initSmoothScrolling();
    }

    initialize();
});
