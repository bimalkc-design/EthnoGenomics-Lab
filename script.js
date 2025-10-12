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
        galleryCycleInterval: 5000, // 5 seconds (this will now only control the animation delays, not a strict cycle)
        scrollOffset: 70, // Adjust this value if your fixed header height changes
        googleScholarId: 'Hp0ZnX4AAAAJ', // *** REMEMBER TO REPLACE THIS WITH YOUR ACTUAL ID, just the ID part ***
        linkedInProfile: 'https://www.linkedin.com/in/bimal-k-chetri-ph-d-a6b840a5/',
        
        // --- NEW: Recent Updates Configuration ---
        updateImageBaseUrl: '', // e.g., 'updates/', 'assets/updates/'
        recentUpdates: [
            { text: "New collaborative project initiated on Himalayan biodiversity.", image: "Update_1.jpg" },
            { text: "Paper published in 'Ecological Genetics and Genomics' journal.", image: "Update_2.jpg" },
            { text: "Workshop on NGS data analysis successfully concluded.", image: "Update_3.jpg" },
            { text: "Field expedition to collect medicinal plant samples.", image: "Update_4.jpg" },
            { text: "Lab welcomes new PhD student focusing on organellar genomics.", image: "Update_5.jpg" }
        ],
        updateCarouselInterval: 6000 // 6 seconds for automatic slide change
    };

    const selectors = {
        navToggle: '.nav-toggle',
        navMenu: '.nav-menu-compact',
        dynamicGallery: '.dynamic-hero-gallery',
        publicationsList: '#publications-list',
        tabButtons: '.tab-button',
        tabContent: '.tab-content',
        sectionLink: '.section-link',
        scrollUpButton: '.scroll-up',
        recentUpdatesContainer: '#recent-updates-carousel',
        updateCarouselIndicators: '#update-carousel-indicators'
    };

    // --- DOM Elements ---
    const navToggle = document.querySelector(selectors.navToggle);
    const navMenu = document.querySelector(selectors.navMenu);
    const dynamicGallery = document.querySelector(selectors.dynamicGallery);
    const publicationsList = document.querySelector(selectors.publicationsList);
    const tabButtons = document.querySelectorAll(selectors.tabButtons);
    const sectionLinks = document.querySelectorAll(selectors.sectionLink);
    const scrollUpButton = document.querySelector(selectors.scrollUpButton);
    const recentUpdatesContainer = document.querySelector(selectors.recentUpdatesContainer);
    const updateCarouselIndicators = document.querySelector(selectors.updateCarouselIndicators);

    let currentGalleryImageIndex = 0;
    let updateCarouselIntervalId;

    // --- Helper Functions ---
    const toggleNavMenu = () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active'); // Animate the hamburger icon
    };

    const smoothScroll = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerOffset = config.scrollOffset; // Adjust for fixed header
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const animateGalleryImages = () => {
        if (!dynamicGallery) return;

        dynamicGallery.innerHTML = ''; // Clear previous images
        const imgCount = config.galleryImages.length;
        
        // Add all images to the gallery initially, hidden
        config.galleryImages.forEach((imgName, index) => {
            const img = document.createElement('img');
            img.src = config.galleryImageBaseUrl + imgName;
            img.alt = `Gallery Image ${index + 1}`;
            img.classList.add('gallery-image');
            img.style.opacity = '0'; // Start hidden
            img.style.transition = `opacity 1s ease-in-out ${index * 0.5}s`; // Staggered transition delay
            dynamicGallery.appendChild(img);
        });

        const images = dynamicGallery.querySelectorAll('.gallery-image');

        // Function to show images one by one with a delay
        let currentIndex = 0;
        const showNextImage = () => {
            if (currentIndex < images.length) {
                images[currentIndex].style.opacity = '1';
                currentIndex++;
            } else {
                // All images are visible, optionally loop or do something else
                // For now, we'll just keep them visible after they all fade in
                clearInterval(galleryAnimationInterval); // Stop after one full cycle
            }
        };

        // Start showing images
        const galleryAnimationInterval = setInterval(showNextImage, config.galleryCycleInterval / images.length);
    };

    const fetchGoogleScholarPublications = async () => {
        if (!publicationsList) return;

        publicationsList.innerHTML = '<p>Loading publications...</p>'; // Loading indicator

        try {
            // Using a proxy to bypass CORS, or a server-side script
            // For client-side, this requires a public API or a CORS-enabled proxy
            // Note: Directly scraping Google Scholar from client-side JavaScript is often blocked by CORS
            // A common approach is a serverless function (e.g., Netlify Functions, AWS Lambda) or a simple proxy server
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://scholar.google.com/citations?user=${config.googleScholarId}&hl=en`)}`;
            
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            // The content is inside data.contents when using allorigins.win
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');

            const publicationItems = doc.querySelectorAll('#gsc_a_b .gsc_a_tr');
            
            if (publicationItems.length > 0) {
                publicationsList.innerHTML = ''; // Clear loading message
                publicationItems.forEach(item => {
                    const title = item.querySelector('.gsc_a_at').textContent;
                    const authors = item.querySelector('.gsc_a_an').textContent;
                    const journal = item.querySelector('.gsc_a_ti').textContent;
                    const year = item.querySelector('.gsc_a_h').textContent;
                    const citationLink = item.querySelector('.gsc_a_at').href;

                    const li = document.createElement('li');
                    li.innerHTML = `
                        <a href="${citationLink}" target="_blank" rel="noopener noreferrer">${title}</a><br>
                        <span>${authors}</span><br>
                        <em>${journal}, ${year}</em>
                    `;
                    publicationsList.appendChild(li);
                });
            } else {
                publicationsList.innerHTML = '<p>No publications found or unable to fetch.</p>';
            }

        } catch (error) {
            console.error('Error fetching Google Scholar publications:', error);
            publicationsList.innerHTML = '<p>Error loading publications. Please try again later.</p>';
        }
    };

    const activateTab = (tabId) => {
        // Deactivate all tab buttons and content
        tabButtons.forEach(button => button.classList.remove('active'));
        document.querySelectorAll(selectors.tabContent).forEach(content => content.classList.remove('active'));

        // Activate the clicked button and corresponding content
        const clickedButton = document.querySelector(`[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(tabId);

        if (clickedButton) clickedButton.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    };

    const setupRecentUpdatesCarousel = () => {
        if (!recentUpdatesContainer) return;

        recentUpdatesContainer.innerHTML = ''; // Clear any existing content
        updateCarouselIndicators.innerHTML = ''; // Clear existing indicators

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
            recentUpdatesContainer.appendChild(item);

            // Create indicator dot
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide-to', index);
            updateCarouselIndicators.appendChild(indicator);
        });

        startUpdateCarousel();
    };

    const startUpdateCarousel = () => {
        const items = recentUpdatesContainer.querySelectorAll('.carousel-item');
        const indicators = updateCarouselIndicators.querySelectorAll('.carousel-indicator');
        let currentIndex = 0;

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

        // Clear any existing interval to prevent duplicates
        if (updateCarouselIntervalId) {
            clearInterval(updateCarouselIntervalId);
        }
        updateCarouselIntervalId = setInterval(nextSlide, config.updateCarouselInterval);

        // Add event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
                clearInterval(updateCarouselIntervalId); // Reset interval on manual click
                updateCarouselIntervalId = setInterval(nextSlide, config.updateCarouselInterval);
            });
        });
    };

    // --- Event Listeners ---

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleNavMenu);
    }

    // Smooth scrolling for internal links
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove '#'
            smoothScroll(targetId);
            if (navMenu && navMenu.classList.contains('active')) {
                toggleNavMenu(); // Close nav menu after clicking a link
            }
        });
    });

    // Tab functionality for Research/About
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    // Show/hide scroll-up button
    if (scrollUpButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollUpButton.classList.add('show');
            } else {
                scrollUpButton.classList.remove('show');
            }
        });

        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Initializations ---

    // Animate the hero gallery images
    animateGalleryImages();

    // Fetch publications if the element exists
    if (publicationsList) {
        fetchGoogleScholarPublications();
    }

    // Activate the first tab by default (if tabs exist)
    if (tabButtons.length > 0) {
        activateTab(tabButtons[0].getAttribute('data-tab'));
    }

    // Setup recent updates carousel
    if (recentUpdatesContainer) {
        setupRecentUpdatesCarousel();
    }
});
