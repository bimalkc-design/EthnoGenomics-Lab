document.addEventListener('DOMContentLoaded', () => {
    // --- Constants & Configuration ---
    const config = {
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
        galleryCycleInterval: 5000, // 5 seconds
        scrollOffset: 70, // Adjust for fixed header height
        googleScholarId: 'YOUR_GOOGLE_SCHOLAR_ID', // Replace with actual ID
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
        googleScholarLink: '.btn[href*="scholar.google.com"]' // Selects the Google Scholar button
    };

    const elements = {};
    for (const key in selectors) {
        elements[key] = document.querySelectorAll(selectors[key]);
        if (elements[key].length === 1) elements[key] = elements[key][0]; // Dereference single elements
    }

    // --- Utility Functions ---

    /**
     * Smoothly scrolls to a target element.
     * @param {HTMLElement} target - The element to scroll to.
     */
    function smoothScrollTo(target) {
        if (target) {
            const offset = elements.navMenu ? elements.navMenu.offsetHeight : config.scrollOffset;
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
        const headerHeight = document.querySelector('.main-header-compact').offsetHeight; // Dynamically get header height
        const scrollPos = window.scrollY + headerHeight + 10; // Add some buffer

        elements.sections.forEach(section => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                currentId = section.id;
            }
        });

        elements.navLinks.forEach(link => {
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
        elements.navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                smoothScrollTo(target);

                // Close mobile nav after clicking a link
                if (window.innerWidth <= 992 && elements.navMenu.classList.contains('open')) {
                    elements.navMenu.classList.remove('open');
                    elements.navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Dynamic Hero Gallery ---

    let currentGalleryIndex = 0;

    /**
     * Creates and appends gallery images to the dynamic gallery container.
     */
    function createDynamicGallery() {
        if (!elements.dynamicGallery || config.galleryImages.length === 0) return;

        config.galleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            // Assuming images are in the root or a known path relative to index.html
            img.src = src; // Using just the filename as per your provided list
            img.alt = `Lab Image ${index + 1}`;
            img.loading = 'lazy'; // Improve performance
            if (index === 0) img.classList.add('active'); // First image active initially
            elements.dynamicGallery.appendChild(img);
        });
    }

    /**
     * Cycles through gallery images for a flashing effect.
     */
    function cycleGalleryImages() {
        if (!elements.dynamicGallery) return;

        const images = elements.dynamicGallery.querySelectorAll('img');
        if (images.length === 0) return;

        // Hide current active image
        images[currentGalleryIndex].classList.remove('active');

        // Move to the next image, loop if at end
        currentGalleryIndex = (currentGalleryIndex + 1) % images.length;

        // Show new active image
        images[currentGalleryIndex].classList.add('active');
    }

    /**
     * Initializes the dynamic image gallery.
     */
    function initDynamicGallery() {
        if (config.galleryImages.length > 0 && elements.dynamicGallery) {
            createDynamicGallery();
            setInterval(cycleGalleryImages, config.galleryCycleInterval);
        }
    }

    // --- Publications Section ---
    const publications = [
        {
            title: "Chloroplast Genome Sequencing of *Rhododendron arboreum* from the Eastern Himalayas: Insights into Phylogeny and Adaptive Evolution",
            authors: "Chetri, B. K., Sharma, S., & Rai, R.",
            journal: "Journal of Plant Genomics",
            year: "2023",
            link: "https://scholar.google.com/scholar?q=Chloroplast+Genome+Sequencing+Rhododendron+arboreum+2023"
        },
        {
            title: "Ethnobotanical Survey of Medicinal Plants Used by Indigenous Communities in Eastern Bhutan",
            authors: "Chetri, B. K., Wangchuk, T., & Dorji, P.",
            journal: "Ethnobotany Research and Applications",
            year: "2022",
            link: "https://scholar.google.com/scholar?q=Ethnobotanical+Survey+Bhutan+2022"
        },
        {
            title: "Mitochondrial Genome Analysis of *Paris polyphylla* Reveals Phylogenetic Relationships and Genetic Diversity",
            authors: "Sharma, S., Chetri, B. K., & Pradhan, N.",
            journal: "BMC Plant Biology",
            year: "2021",
            link: "https://scholar.google.com/scholar?q=Mitochondrial+Genome+Paris+polyphylla+2021"
        }
        // Add more publications here following the same structure
    ];

    /**
     * Populates the publications list from the 'publications' array.
     */
    function loadPublications() {
        if (elements.publicationsList) {
            elements.publicationsList.innerHTML = ''; // Clear existing content
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
        elements.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                elements.tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                elements.tabPanes.forEach(pane => pane.classList.remove('active'));
                const activePane = document.getElementById(tabId);
                if (activePane) activePane.classList.add('active');
            });
        });
        // Ensure the first tab is active on load
        if (elements.tabButtons.length > 0 && elements.tabPanes.length > 0) {
            elements.tabButtons[0].click(); // Simulate click on the first button
        }
    }

    // --- Scroll to Top Button ---

    /**
     * Manages the visibility and click behavior of the "Scroll to Top" button.
     */
    function initScrollToTop() {
        if (elements.scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                elements.scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none'; // Show after 300px
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
     * Updates dynamic links with actual profile IDs.
     */
    function updateDynamicLinks() {
        if (elements.googleScholarLink && config.googleScholarId !== 'YOUR_GOOGLE_SCHOLAR_ID') {
            elements.googleScholarLink.href = `https://scholar.google.com/citations?user=${config.googleScholarId}`;
        }

        // Add LinkedIn to contact grid if not already present in HTML
        const contactGrid = document.querySelector('.contact-grid');
        if (contactGrid && config.linkedInProfile) {
            // Check if LinkedIn link already exists to avoid duplication
            if (!document.querySelector('a[href*="linkedin.com"]')) {
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
                contactGrid.appendChild(linkedInItem);
            }
        }
    }

    // --- Initialize All Functionalities ---
    function initialize() {
        initMobileNav();
        initDynamicGallery();
        loadPublications();
        initTabs();
        initScrollToTop();
        setCurrentYear();
        updateDynamicLinks();

        // Initial highlights and scroll listeners
        highlightActiveNavLink();
        window.addEventListener('scroll', highlightActiveNavLink);
        initSmoothScrolling();
    }

    initialize();
});
