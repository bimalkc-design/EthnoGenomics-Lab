document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = document.querySelector('.main-nav').offsetHeight; // Get nav height
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
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

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('open');
        });
    }

    // --- Dynamic "Flash in Motion" Gallery (Top Section) ---
    const topGalleryWrapper = document.createElement('div');
    topGalleryWrapper.classList.add('top-gallery-wrapper');
    const heroContent = document.querySelector('.hero-content');
    heroContent.appendChild(topGalleryWrapper); // Append to hero content

    const topGalleryImages = [
        'images/gallery/fieldwork_1.jpg',
        'images/gallery/lab_1.jpg',
        'images/gallery/plant_species_1.jpg',
        'images/gallery/bhutan_landscape.jpg'
    ];
    let currentTopImageIndex = 0;

    function createTopGallery() {
        topGalleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `EthnoGenomics Lab Image ${index + 1}`;
            img.classList.add('top-gallery-image');
            if (index === 0) {
                img.classList.add('active'); // Set first image as active initially
            }
            topGalleryWrapper.appendChild(img);
        });
    }

    function cycleTopGalleryImages() {
        const images = topGalleryWrapper.querySelectorAll('.top-gallery-image');
        images[currentTopImageIndex].classList.remove('active');
        currentTopImageIndex = (currentTopImageIndex + 1) % images.length;
        images[currentTopImageIndex].classList.add('active');
    }

    if (topGalleryImages.length > 0) {
        createTopGallery();
        setInterval(cycleTopGalleryImages, 4000); // Change image every 4 seconds
    }


    // --- Gallery Section (Main Content) ---
    const galleryImages = [
        'images/gallery/fieldwork_1.jpg',
        'images/gallery/lab_1.jpg',
        'images/gallery/plant_species_1.jpg',
        'images/gallery/fieldwork_2.jpg',
        'images/gallery/lab_2.jpg',
        'images/gallery/plant_species_2.jpg',
        'images/gallery/bhutan_landscape.jpg',
        'images/gallery/research_team.jpg',
        'images/gallery/herbarium_specimen.jpg'
    ];

    const galleryTrack = document.querySelector('.gallery-track');
    const galleryModal = document.createElement('div');
    galleryModal.classList.add('gallery-modal');
    galleryModal.innerHTML = `
        <span class="close-btn">&times;</span>
        <img class="modal-content" id="img01">
        <div id="caption"></div>
    `;
    document.body.appendChild(galleryModal);

    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.gallery-modal .close-btn');

    closeBtn.onclick = function() {
        galleryModal.style.display = "none";
    }

    galleryImages.forEach((src, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `EthnoGenomics Lab - ${src.split('/').pop().replace('.jpg', '').replace(/_/g, ' ')}`;
        img.loading = 'lazy'; // Lazy load images

        img.onclick = function() {
            galleryModal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
        imgContainer.appendChild(img);
        galleryTrack.appendChild(imgContainer);
    });

    // Gallery Motion effect (horizontal scroll simulation)
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        let scrollAmount = 0;
        const scrollSpeed = 0.5; // pixels per frame

        function animateGalleryScroll() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= galleryTrack.scrollWidth - galleryContainer.clientWidth) {
                scrollAmount = 0; // Reset scroll if end reached
            }
            galleryContainer.scrollLeft = scrollAmount;
            requestAnimationFrame(animateGalleryScroll);
        }
        // Start scrolling only if content overflows
        if (galleryTrack.scrollWidth > galleryContainer.clientWidth) {
            // animateGalleryScroll(); // Uncomment to enable continuous scroll
        }
    }


    // --- Publications Loading ---
    const publications = [
        {
            title: "Chloroplast Genome Sequencing of *Rhododendron arboreum* from the Eastern Himalayas: Insights into Phylogeny and Adaptive Evolution",
            authors: "Chetri, B. K., Sharma, S., & Rai, R.",
            journal: "Journal of Plant Genomics",
            year: "2023",
            link: "https://example.com/pub1"
        },
        {
            title: "Ethnobotanical Survey of Medicinal Plants Used by Indigenous Communities in Eastern Bhutan",
            authors: "Chetri, B. K., Gurung, S., & Dendup, C.",
            journal: "Economic Botany",
            year: "2022",
            link: "https://example.com/pub2"
        },
        {
            title: "Mitochondrial Genome Analysis of *Swertia chirayita* Reveals Novel Genetic Markers for Species Authentication",
            authors: "Rai, R., Chetri, B. K., & Sharma, S.",
            journal: "BMC Plant Biology",
            year: "2021",
            link: "https://example.com/pub3"
        },
        {
            title: "Assessing Carbon Sequestration Potential of Forest Ecosystems in Bhutan using Remote Sensing and GIS",
            authors: "Wangchuk, T., Chetri, B. K., & Dorji, T.",
            journal: "Environmental Science & Policy",
            year: "2020",
            link: "https://example.com/pub4"
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
        if (window.scrollY > 300) { // Show button after scrolling down 300px
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

    // --- Active Nav Link Highlight ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.main-nav').offsetHeight - 50; // Adjust for nav height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink(); // Call on load to set initial active link
});
