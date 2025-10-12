document.addEventListener('DOMContentLoaded', () => {
    // --- Constants & Configuration ---
    const config = {
        // Assume gallery images are in the root directory or a specific path like 'assets/'
        // IMPORTANT: Adjust these paths if your images are in a subfolder (e.g., 'images/2.10.jpg')
        galleryImageBaseUrl: '', // e.g., 'images/', 'assets/gallery/'
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
        galleryCycleInterval: 5000, // This will be used for the staggered fade-in, not a strict cycle.
        scrollOffset: 70, // Adjust this value if your fixed header height changes
        googleScholarId: 'Hp0ZnX4AAAAJ', // *** REMEMBER TO REPLACE THIS WITH YOUR ACTUAL ID, just the ID part ***
        linkedInProfile: 'https://www.linkedin.com/in/bimal-k-chetri-ph-d-a6b840a5/',
        
        // --- NEW: Recent Updates Configuration (MERGED FROM YOUR FIRST REQUEST) ---
        updateImageBaseUrl: '', // e.g., 'updates/', 'assets/updates/'
        recentUpdates: [
            { 
                text: "The Royal University of Bhutan - Sherubtse and 'Ovidius' University of Constanţa (Romania) invite you to the scientific lecture 'Bhutan: From Local Wisdom to Sustainable Approach' by Assoc. Prof. Dr. Bimal K. CHETRI (The Royal University of Bhutan - Sherubtse). Join us on Thursday, October 9, 2025, 10:00 – 11:00 AM, in room E216, building B, campus.", 
                image: "update_1.jpg" // Using update_1.jpg as requested
            },
            { 
                text: "Dr. Chetri's expertise: high-altitude medicinal plants, genomics, plant flow cytometry, and ecophysiology. Specializing in molecular and ecological study of high-altitude medicinal plants, integrating plant genomics and molecular phylogeny for adaptive mechanisms, therapeutic potential, and conservation strategies.", 
                image: "Update_2.jpg" // Using Update_2.jpg
            },
            { 
                text: "Significant contributions to understanding plant adaptation in extreme environments, with extensive publications on plastome and mitogenome analyses, nuclear DNA content estimation, and ethnobotanical research.", 
                image: "Update_3.jpg" // Using Update_3.jpg
            },
            { 
                text: "Key Expertise Areas: High-altitude medicinal plants, Genomics, Plant flow cytometry, Molecular phylogeny, Organellar genome mining, Evolutionary dynamics, Ethnobotany, Plant conservation.", 
                image: "Update_4.jpg" // Using Update_4.jpg
            },
            { 
                text: "Organizers: Dr. Liviu-Daniel GALAŢCHI & Dr. Bimal-Kumar CHETRI", 
                image: "5.0.jpg" // Example: Using another image from your existing list if no specific "Update_5.jpg" is meant for this
            }
        ],
        updateCarouselInterval: 6000 // 6 seconds for automatic slide change
    };

    const selectors = {
        navToggle: '.nav-toggle',
        navMenu: '.nav-menu-compact',
        dynamicGallery: '.dynamic-hero-gallery',
        publicationsList: '#publications-list',
        tabButtons: '.tab-button',
        tabPanes: '.tab-pane', // Changed from tabContent as per your latest code
        scrollToTopBtn: '#scrollToTopBtn', // Changed from scrollUpButton
        currentYearSpan: '#current-year',
        sections: 'section[id]',
        navLinks: '.nav-menu-compact a[href^="#"]',
        googleScholarLink: 'a[href*="scholar.google.com"]',
        // --- NEW: Selectors for Recent Updates Carousel ---
        recentUpdatesContainer: '#recent-updates-carousel', // Add this selector
        updateCarouselIndicators: '#update-carousel-indicators' // Add this selector
    };

    // Store DOM elements for easier access
    const elements = {};
    for (const key in selectors) {
        const found = document.querySelectorAll(selectors[key]);
        elements[key] = found.length === 1 ? found[0] : found; // If only one element, store directly; otherwise, store NodeList
    }

    // --- State Variables ---
    let updateCarouselIntervalId; // For managing the recent updates carousel auto-advance

    // --- Utility Functions ---

    /**
     * Smoothly scrolls to a target element.
     * @param {HTMLElement} target - The element to scroll to.
     */
    function smoothScrollTo(target) {
        if (target) {
            // Get header height for accurate scroll position, fallback to config
            const header = document.querySelector('.main-header-compact');
            const offset = header ? header.offsetHeight : config.scrollOffset;
            const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    }

    // --- Navigation & Header ---

    /**
     * Initializes mobile navigation toggle functionality.
     */
    function initMobileNav() {
        if (elements.navToggle && elements.navMenu) {
            elements.navToggle.addEventListener('click', () => {
                const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
                elements.navToggle.setAttribute('aria-expanded', !isExpanded);
                elements.navMenu.classList.toggle('open');
            });

            // Close nav when clicking outside
            document.addEventListener('click', (event) => {
                if (!elements.navMenu.contains(event.target) && !elements.navToggle.contains(event.target) && elements.navMenu.classList.contains('open')) {
                    elements.navMenu.classList.remove('open');
                    elements.navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    /**
     * Highlights the active navigation link based on scroll position.
     */
    function highlightActiveNavLink() {
        let currentId = '';
        const header = document.querySelector('.main-header-compact');
        const headerHeight = header ? header.offsetHeight : 0;
        const scrollPos = window.scrollY + headerHeight + 10; // Add some buffer

        // Ensure elements.sections is an iterable NodeList
        Array.from(elements.sections).forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                currentId = section.id;
            }
        });

        // Ensure elements.navLinks is an iterable NodeList
        Array.from(elements.navLinks).forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Attaches smooth scroll behavior to navigation links.
     */
    function initSmoothScrolling() {
        // Ensure elements.navLinks is an iterable NodeList
        Array.from(elements.navLinks).forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                smoothScrollTo(target);

                // Close mobile nav after clicking a link
                if (window.innerWidth <= 992 && elements.navMenu && elements.navMenu.classList.contains('open')) {
                    elements.navMenu.classList.remove('open');
                    elements.navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Dynamic Hero Gallery ---

    /**
     * Creates and appends gallery images to the dynamic gallery container.
     * Implements a staggered fade-in animation, with images remaining visible.
     */
    function createDynamicGallery() {
        if (!elements.dynamicGallery || config.galleryImages.length === 0) return;

        elements.dynamicGallery.innerHTML = ''; // Clear existing content to prevent duplicates

        config.galleryImages.forEach((imgName, index) => {
            const img = document.createElement('img');
            img.src = config.galleryImageBaseUrl + imgName;
            img.alt = `Lab Image ${index + 1}`;
            img.classList.add('gallery-image'); // Add a class for potential styling/animation
            img.style.opacity = '0'; // Start hidden
            // Staggered transition delay based on index
            img.style.transition = `opacity 1s ease-in-out ${index * 0.5}s`; 
            elements.dynamicGallery.appendChild(img);
        });

        // After adding all images, trigger their fade-in after a short delay
        setTimeout(() => {
            Array.from(elements.dynamicGallery.children).forEach(img => {
                img.style.opacity = '1';
            });
        }, 100); // Give browser a moment to render before starting transitions
    }
    
    /**
     * Initializes the dynamic image gallery.
     */
    function initDynamicGallery() {
        if (config.galleryImages.length > 0 && elements.dynamicGallery) {
            createDynamicGallery();
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
            authors: "BImal K Chetri, K., Phuntsho Wangdi, Tshering Penjor",
            journal: "Asian Plant Research Journal",
            year: "2018",
            link: "https://d1wqtxts1xzle7.cloudfront.net/59067833/Chetri122018APRJ4578620190428-37384-8w2tn0-libre.pdf?1556505489=&response-content-disposition=inline%3B+filename%3DEthnomedicinal_Practices_in_Kilikhar_Mon.pdf&Expires=1760258951&Signature=K0~XHfL7rt~KHyRb3DbP0D7mkgwyQLWCnFABmOKcKWjQYGXH9jV20DTVsnjtYPnOvVeeRS7INOmg3GVTr7-gXkMTS1El8DKsldrWmSbXuYC801T4RFPRLdTyl0etsNjmyrSkjFBzuYrTWV8oHKkH7r8UR7A~so1l~-DnZjjrEd2ka27gQwv29qoZVJkw~fzUjZIZrm2F8iI0Cku10hQWsqhn2nBtO8trcU-yIcdJ0jAyxSNNOiD9Jx5~2IXuJvsE91HhX47dHsPiDN67Z3LOzIjznaxPFSghoiG-ZNhKuIFSCa-4d5OFManm0IhORzH9ylz4U2pZ0NaEzVG6lAZcyg__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA"
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
        // Add more publications here following the same structure
    ];

    /**
     * Populates the publications list from the 'publications' array.
     */
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

    // --- Tab Functionality ---

    /**
     * Initializes tab switching behavior for content panes.
     */
    function initTabs() {
        // Ensure elements.tabButtons is an iterable NodeList
        Array.from(elements.tabButtons).forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                Array.from(elements.tabButtons).forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Ensure elements.tabPanes is an iterable NodeList
                Array.from(elements.tabPanes).forEach(pane => pane.classList.remove('active'));
                const activePane = document.getElementById(tabId);
                if (activePane) activePane.classList.add('active');
            });
        });
        // Ensure the first tab is active on load
        if (elements.tabButtons.length > 0 && elements.tabPanes.length > 0) {
            elements.tabButtons[0].click(); // Simulate a click on the first button
        }
    }

    // --- Recent Updates Carousel (Re-added) ---

    /**
     * Sets up and populates the recent updates carousel.
     */
    const setupRecentUpdatesCarousel = () => {
        // Ensure these elements exist before proceeding
        if (!elements.recentUpdatesContainer || !elements.updateCarouselIndicators) return;

        elements.recentUpdatesContainer.innerHTML = ''; // Clear any existing content
        elements.updateCarouselIndicators.innerHTML = ''; // Clear existing indicators

        config.recentUpdates.forEach((update, index) => {
            // Create carousel item
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if (index === 0) item.classList.add('active'); // First item active by default

            item.innerHTML = `
                <img src="${config.updateImageBaseUrl}${update.image}" alt="Update ${index + 1}">
                <div class="carousel-caption">
                    <p>${update.text}</p>
                </div>
            `;
            elements.recentUpdatesContainer.appendChild(item);

            // Create indicator dot button
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide-to', index);
            elements.updateCarouselIndicators.appendChild(indicator);
        });

        startUpdateCarousel(); // Start the carousel animation after setup
    };

    /**
     * Manages the automatic cycling and manual navigation of the recent updates carousel.
     */
    const startUpdateCarousel = () => {
        const items = elements.recentUpdatesContainer.querySelectorAll('.carousel-item');
        const indicators = elements.updateCarouselIndicators.querySelectorAll('.carousel-indicator');
        let currentIndex = 0;

        if (items.length === 0) return; // No updates to carousel

        /**
         * Shows a specific slide by adding 'active' class and updates indicators.
         * @param {number} index The index of the slide to show.
         */
        const showSlide = (index) => {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        };

        /**
         * Advances to the next slide in the carousel.
         */
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        };

        // Clear any existing interval to prevent multiple carousel loops
        if (updateCarouselIntervalId) {
            clearInterval(updateCarouselIntervalId);
        }
        // Start the automatic slide rotation
        updateCarouselIntervalId = setInterval(nextSlide, config.updateCarouselInterval);

        // Add event listeners for indicator buttons to allow manual navigation
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
                // Reset the auto-cycle interval on manual click
                clearInterval(updateCarouselIntervalId); 
                updateCarouselIntervalId = setInterval(nextSlide, config.updateCarouselInterval);
            });
        });
    };

    // --- Scroll to Top Button ---

    /**
     * Manages the visibility and click behavior of the "Scroll to Top" button.
     */
    function initScrollToTop() {
        if (elements.scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                elements.scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
            });
            elements.scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }
    }

    // --- Footer & Dynamic Content ---

    /**
     * Sets the current year in the footer.
     */
    function setCurrentYear() {
        if (elements.currentYearSpan) {
            elements.currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    /**
     * Updates dynamic links with actual profile IDs and adds LinkedIn.
     */
    function updateDynamicLinks() {
        // Update Google Scholar link if ID is provided
        const googleScholarBaseUrl = 'https://scholar.google.com/citations?user=';
        if (elements.googleScholarLink && config.googleScholarId && config.googleScholarId !== 'YOUR_GOOGLE_SCHOLAR_ID') { 
            if (elements.googleScholarLink.href.startsWith(googleScholarBaseUrl) || elements.googleScholarLink.href === 'https://scholar.google.com/citations?hl=ro&user=Hp0ZnX4AAAAJ') {
                 elements.googleScholarLink.href = googleScholarBaseUrl + config.googleScholarId;
            }
        }

        // Add LinkedIn to contact grid if not already present
        const contactGrid = document.querySelector('.contact-grid'); // Use querySelector for single element
        if (contactGrid && config.linkedInProfile) {
            // Check if a LinkedIn link already exists to prevent duplicates
            if (!contactGrid.querySelector('a[href*="linkedin.com"]')) {
                const linkedInItem = document.createElement('a');
                linkedInItem.href = config.linkedInProfile;
                linkedInItem.target = "_blank";
                linkedInItem.rel = "noopener noreferrer";
                linkedInItem.classList.add('contact-item');
                linkedInItem.innerHTML = `
                    <i class="fab fa-linkedin"></i>
                    <h4>LinkedIn</h4>
                    <p>View Profile</p>
                `;
                const qrcodeItem = contactGrid.querySelector('.qrcode-item');
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
        initMobileNav();
        initDynamicGallery();
        loadPublications();
        initTabs();
        setupRecentUpdatesCarousel(); // Call this to set up and start the carousel
        initScrollToTop();
        setCurrentYear();
        updateDynamicLinks(); // Call this after all static HTML is parsed

        // Initial highlights and scroll listeners
        highlightActiveNavLink();
        window.addEventListener('scroll', highlightActiveNavLink);
        initSmoothScrolling();
    }

    initialize();
});
