document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links (won't be used if overflow:hidden on body)
    // Keeping it in case you change your mind for very slight scroll on certain views
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dummy data for publications (replace with your actual data)
    const publications = [
        {
            title: "Genome-wide insights into 'Example Species A'", // Shorter title
            authors: "Chetri BK, Sharma P", // Shorter authors list
            journal: "J. Plant Genomics", // Abbreviated journal
            year: 2023,
            link: "https://example.com/pub1"
        },
        {
            title: "Ethnobotany of medicinal plants in Himalayas",
            authors: "Devi R, Chetri BK",
            journal: "Economic Botany",
            year: 2022,
            link: "https://example.com/pub2"
        },
        {
            title: "Chloroplast genome of *Swertia chirayita*",
            authors: "Chetri BK, Singh A",
            journal: "Mitochondrial DNA",
            year: 2021,
            link: "https://example.com/pub3"
        },
        {
            title: "Climate change impact on plant distribution",
            authors: "Kumar S, Chetri BK",
            journal: "Env. Sci. Tech.",
            year: 2020,
            link: "https://example.com/pub4"
        },
        { // Added a few more to test the overflow-auto for publications
            title: "New insights into plant metabolomics",
            authors: "Chetri BK, Li X",
            journal: "Phytochemistry",
            year: 2019,
            link: "https://example.com/pub5"
        },
        {
            title: "Bioinformatics tools for plant genome analysis",
            authors: "Sharma P, Chetri BK",
            journal: "Bioinformatics Today",
            year: 2018,
            link: "https://example.com/pub6"
        }
        // Add more publications as needed
    ];

    const publicationsList = document.getElementById('publications-list');
    if (publicationsList) {
        publications.forEach(pub => {
            const pubDiv = document.createElement('div');
            pubDiv.classList.add('publication-item');
            pubDiv.innerHTML = `
                <h3><a href="${pub.link}" target="_blank">${pub.title}</a></h3>
                <p>${pub.authors} &bull; ${pub.journal} (${pub.year})</p>
            `;
            publicationsList.appendChild(pubDiv);
        });
    }

    // Gallery Flashing/Transition
    const galleryImages = [
        'gallery1.jpg', // Replace with your image paths
        'gallery2.jpg',
        'gallery3.jpg',
        'gallery4.jpg'
        // Add more images here
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid && galleryImages.length > 0) {
        let currentIndex = 0;

        // Preload images to prevent flickering
        galleryImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        function createAndAppendImage(src, isActive) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Gallery Image ${currentIndex + 1}`;
            img.classList.add('gallery-image');
            if (isActive) {
                img.classList.add('active');
            }
            galleryGrid.appendChild(img);
            return img;
        }

        // Initialize with the first image
        let currentImageElement = createAndAppendImage(galleryImages[0], true);

        function changeImage() {
            // Fade out current image
            currentImageElement.classList.remove('active');

            // Move to the next index
            currentIndex = (currentIndex + 1) % galleryImages.length;

            // Create new image and fade it in
            const nextImageElement = createAndAppendImage(galleryImages[currentIndex], false);
            // Give a small delay for DOM repaint before adding 'active' class for transition
            setTimeout(() => {
                nextImageElement.classList.add('active');
            }, 50);

            // Remove the old image after its transition is complete
            currentImageElement.addEventListener('transitionend', function handler() {
                if (this.parentNode === galleryGrid) { // Check if it's still in the DOM
                    galleryGrid.removeChild(this);
                }
                this.removeEventListener('transitionend', handler);
            });

            currentImageElement = nextImageElement;
        }

        // Change image every 5 seconds (adjust as needed)
        setInterval(changeImage, 5000); // 5000ms = 5 seconds
    }
});
