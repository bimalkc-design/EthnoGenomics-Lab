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
        
        // --- NEW: Recent Updates Configuration (as specified in the original request) ---
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

    // --- State Variables ---
    let currentGalleryImageIndex = 0; // Though currently unused due to new animateGalleryImages logic
    let updateCarouselIntervalId;

    // --- Helper Functions ---

    /**
     * Toggles the active class on the mobile navigation menu and its toggle button.
     */
    const toggleNavMenu = () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active'); // Animate the hamburger icon
    };

    /**
     * Smoothly scrolls the window to a target element, accounting for a fixed header.
     * @param {string} targetId The ID of the element to scroll to.
     */
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

    /**
     * Animates the gallery images by fading them in one by one.
     * Images remain visible after fading in.
     */
    const animateGalleryImages = () => {
        if (!dynamicGallery) return;

        dynamicGallery.innerHTML = ''; // Clear previous images
        
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
                // All images are visible, stop the animation interval
                clearInterval(galleryAnimationInterval);
            }
        };

        // Start showing images with a staggered delay
        const galleryAnimationInterval = setInterval(showNextImage, config.galleryCycleInterval / images.length);
    };

    /**
     * Fetches publications from Google Scholar using a proxy and displays them.
     */
    const fetchGoogleScholarPublications = async () => {
        if (!publicationsList) return;

        publicationsList.innerHTML = '<p>Loading publications...</p>'; // Loading indicator

        try {
            // Using a public proxy to bypass CORS for client-side scraping
            // Note: This is a common approach for demos but may not be robust for production
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://scholar.google.com/citations?user=${config.googleScholarId}&hl=en`)}`;
            
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            // The actual HTML content is inside data.contents when using allorigins.win
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');

            const publicationItems = doc.querySelectorAll('#gsc_a_b .gsc_a_tr');
            
            if (publicationItems.length > 0) {
                publicationsList.innerHTML = ''; // Clear loading message
                publicationItems.forEach(item => {
                    // Extract publication details
                    const titleElement = item.querySelector('.gsc_a_at');
                    const title = titleElement ? titleElement.textContent : 'No Title';
                    const citationLink = titleElement ? titleElement.href : '#';

                    const authorsElement = item.querySelector('.gsc_a_an');
                    const authors = authorsElement ? authorsElement.textContent : 'Unknown Authors';

                    const journalElement = item.querySelector('.gsc_a_ti');
                    const journal = journalElement ? journalElement.textContent : 'Unknown Journal';

                    const yearElement = item.querySelector('.gsc_a_h');
                    const year = yearElement ? yearElement.textContent : 'N.D.';

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

    /**
     * Activates a specific tab, showing its content and highlighting its button.
     * @param {string} tabId The ID of the tab content to activate.
     */
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

    /**
     * Initializes and populates the recent updates carousel with dynamic content.
     */
    const setupRecentUpdatesCarousel = () => {
        if (!recentUpdatesContainer || !updateCarouselIndicators) return;

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

            // Create indicator dot button
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide-to', index);
            updateCarouselIndicators.appendChild(indicator);
        });

        // After setting up the elements, start the carousel functionality
        startUpdateCarousel();
    };

    /**
     * Manages the automatic cycling and manual navigation of the recent updates carousel.
     */
    const startUpdateCarousel = () => {
        const items = recentUpdatesContainer.querySelectorAll('.carousel-item');
        const indicators = updateCarouselIndicators.querySelectorAll('.carousel-indicator');
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

    // --- Event Listeners ---

    // Event listener for mobile navigation toggle button
    if (navToggle) {
        navToggle.addEventListener('click', toggleNavMenu);
    }

    // Event listeners for smooth scrolling on internal navigation links
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href').substring(1); // Get target ID from href (remove '#')
            smoothScroll(targetId);
            // Close the mobile nav menu if it's open after clicking a link
            if (navMenu && navMenu.classList.contains('active')) {
                toggleNavMenu(); 
            }
        });
    });

    // Event listeners for tab switching functionality (e.g., Research/About sections)
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab'); // Get the target tab ID from data-tab attribute
            activateTab(tabId);
        });
    });

    // Event listeners for the scroll-up button visibility and click action
    if (scrollUpButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                scrollUpButton.classList.add('show');
            } else {
                scrollUpButton.classList.remove('show');
            }
        });

        // Scroll to top when button is clicked
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Initializations (Functions called when the DOM is fully loaded) ---

    // Start the hero gallery image animation
    animateGalleryImages();

    // Fetch and display publications from Google Scholar
    if (publicationsList) {
        fetchGoogleScholarPublications();
    }

    // Activate the first tab by default if there are tabs present
    if (tabButtons.length > 0) {
        activateTab(tabButtons[0].getAttribute('data-tab'));
    }

    // Set up and start the recent updates carousel
    if (recentUpdatesContainer) {
        setupRecentUpdatesCarousel();
    }
});
