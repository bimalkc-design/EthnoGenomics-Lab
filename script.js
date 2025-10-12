document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle-compact');
    const navMenu = document.querySelector('.main-nav-compact'); // Target the whole nav container for open/close

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('open');
        });

        // Close nav if clicked outside (optional, but good UX)
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Dynamic "Flash in Motion" Gallery (Top Section - side-wise) ---
    // This assumes the HTML structure for .top-side-gallery-wrapper is already in place.
    const topGalleryWrapper = document.querySelector('.top-side-gallery-wrapper');
    
    const topGalleryImages = [
        'images/gallery/fieldwork_1.jpg',
        'images/gallery/lab_1.jpg',
        'images/gallery/plant_species_1.jpg',
        'images/gallery/bhutan_landscape.jpg',
        'images/gallery/fieldwork_2.jpg' // Added more for better "flash" effect
    ];
    let currentTopImageIndex = 0;

    function createTopGallery() {
        if (!topGalleryWrapper) return; // Exit if wrapper doesn't exist
        topGalleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `EthnoGenomics Lab Image ${index + 1}`;
            img.classList.add('top-side-gallery-image');
            if (index === 0) {
                img.classList.add('active'); // Set first image as active initially
            }
            topGalleryWrapper.appendChild(img);
        });
    }

    function cycleTopGalleryImages() {
        if (!topGalleryWrapper) return;
        const images = topGalleryWrapper.querySelectorAll('.top-side-gallery-image');
        if (images.length === 0) return;

        images[currentTopImageIndex].classList.remove('active');
        currentTopImageIndex = (currentTopImageIndex + 1) % images.length;
        images[currentTopImageIndex].classList.add('active');
    }

    if (topGalleryImages.length > 0 && topGalleryWrapper) {
        createTopGallery();
        setInterval(cycleTopGalleryImages, 4000); // Change image every 4 seconds for flash effect
    }


    // --- Publications Loading ---
    const publications = [
        {
            title: "Chloroplast Genome Sequencing of *Rhododendron arboreum* from the Eastern Himalayas: Insights into Phylogeny and Adaptive Evolution",
            authors: "Chetri, B. K., Sharma, S., & Rai, R.",
            journal: "Journal of Plant Genomics",
            year: "2023",
            link: "https://scholar.google.com/scholar?q=Chloroplast+Genome+Sequencing+Rhododendron+arboreum"
        },
        {
            title: "Ethnobotanical Survey of Medicinal Plants Used by Indigenous Communities in Eastern Bhutan",
            authors: "Chetri, B. K., Gurung, S., & Dendup, C.",
            journal: "Economic Botany",
            year: "2022",
            link: "https://scholar.google.com/scholar?q=Ethnobotanical+Survey+Medicinal+Plants+Bhutan"
        },
        {
            title: "Mitochondrial Genome Analysis of *Swertia chirayita* Reveals Novel Genetic Markers for Species Authentication",
            authors: "Rai, R., Chetri, B. K., & Sharma, S.",
            journal: "BMC Plant Biology",
            year: "2021",
            link: "https://scholar.google.com/scholar?q=Mitochondrial+Genome+Swertia+chirayita"
        },
        {
            title: "Assessing Carbon Sequestration Potential of Forest Ecosystems in Bhutan using Remote Sensing and GIS",
            authors: "Wangchuk, T., Chetri, B. K., & Dorji, T.",
            journal: "Environmental Science & Policy",
            year: "2020",
            link: "https://scholar.google.com/scholar?q=Carbon+Sequestration+Bhutan+Remote+Sensing"
        }
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

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Show button after scrolling down 200px (less for compact)
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Nav Link Highlight (adjusting for compact header) ---
    const sections = document.querySelectorAll('section[id]'); // Select sections with an ID
    const navLinks = document.querySelectorAll('.nav-menu-compact a'); // Select links in the compact menu

    function highlightActiveNavLink() {
        let currentSectionId = '';
        const headerHeight = document.querySelector('.compact-header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 10; // Add some offset

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink(); // Call on load to set initial active link

    // --- Smooth Scrolling for Navigation (updated for new structure) ---
    document.querySelectorAll('.nav-menu-compact a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = document.querySelector('.compact-header').offsetHeight; // Use compact header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile nav after clicking a link
                if (window.innerWidth <= 992) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});
