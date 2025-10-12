document.addEventListener('DOMContentLoaded', () => {
    // ... existing nav toggle and other functionalities ...

    // --- Dynamic Hero Gallery (Fade Effect) ---
    const heroGallery = document.querySelector('.dynamic-hero-gallery');
    const heroImages = [
        'images/gallery/fieldwork_1.jpg',
        'images/gallery/lab_1.jpg',
        'images/gallery/plant_species_1.jpg',
        'images/gallery/bhutan_landscape.jpg',
        'images/gallery/fieldwork_2.jpg'
    ];
    let currentHeroImageIndex = 0;

    function createHeroGallery() {
        if (!heroGallery) return;
        heroImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `EthnoGenomics Lab Image ${index + 1}`;
            if (index === 0) {
                img.classList.add('active');
            }
            heroGallery.appendChild(img);
        });
    }

    function cycleHeroGalleryImages() {
        if (!heroGallery) return;
        const images = heroGallery.querySelectorAll('img');
        if (images.length === 0) return;

        images[currentHeroImageIndex].classList.remove('active');
        currentHeroImageIndex = (currentHeroImageIndex + 1) % images.length;
        images[currentHeroImageIndex].classList.add('active');
    }

    if (heroGallery) {
        createHeroGallery();
        setInterval(cycleHeroGalleryImages, 5000); // Change image every 5 seconds
    }


    // --- Tab Functionality for Main Content ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activate clicked button
            button.classList.add('active');

            // Activate corresponding pane
            const targetTab = button.dataset.tab;
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- Publications Loading (existing logic, just ensure selector is correct) ---
    // ... your publications array and logic ...
    const publicationsList = document.getElementById('publications-list');
    if (publicationsList) {
        // ... populate publications ...
    }

    // --- Full Gallery Loading (if dynamic) ---
    const fullGalleryContainer = document.getElementById('gallery-container');
    const fullGalleryImages = [
        'images/gallery/2.10.jpg', 'images/gallery/3.5a.jpg', 'images/gallery/3.5b.jpg',
        'images/gallery/3.6.jpg', 'images/gallery/4.2.jpg', 'images/gallery/4.4.jpg',
        'images/gallery/5.0.jpg', 'images/gallery/5.2.jpg',
        'images/gallery/fieldwork_1.jpg', 'images/gallery/lab_1.jpg', 'images/gallery/plant_species_1.jpg',
        'images/gallery/bhutan_landscape.jpg', 'images/gallery/fieldwork_2.jpg'
    ]; // Add more images for the full gallery

    if (fullGalleryContainer) {
        fullGalleryImages.forEach(src => {
            const div = document.createElement('div');
            div.classList.add('gallery-item');
            div.innerHTML = `<img src="${src}" alt="EthnoGenomics Lab image">`;
            fullGalleryContainer.appendChild(div);
        });
        // Optional: Add lightbox functionality here for gallery items
    }

    // ... scroll-to-top, current year, active nav link logic (adjusted for new header and tab links) ...

    // Adjust highlightActiveNavLink for tab-based navigation
    function highlightActiveNavLink() {
        // Since main content is tabbed, we only highlight the active tab link based on current active tab
        const activeTabButton = document.querySelector('.tab-button.active');
        if (activeTabButton) {
            const targetTabId = activeTabButton.dataset.tab;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetTabId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    // Also, when a tab button is clicked, update the nav highlight
    tabButtons.forEach(button => {
        button.addEventListener('click', highlightActiveNavLink);
    });

    // Initial check for hash in URL to open specific tab (e.g., #contact)
    if (window.location.hash) {
        const hash = window.location.hash.substring(1); // Remove '#'
        const correspondingTabButton = document.querySelector(`.tab-button[data-tab="${hash}"]`);
        if (correspondingTabButton) {
            correspondingTabButton.click(); // Simulate a click to open the tab
        }
    } else {
        // Default to 'about' tab if no hash
        document.querySelector('.tab-button[data-tab="about"]').click();
    }
});
