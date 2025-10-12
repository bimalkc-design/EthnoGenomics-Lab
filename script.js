// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Global Variables ---
    const mainNav = document.querySelector('.main-nav');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const galleryTrack = document.querySelector('.gallery-track');

    // --- Helper Function for Debouncing ---
    // Useful for scroll events to limit how often a function runs
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    };

    // --- Set current year in footer ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Smooth Scrolling for Navigation ---
    navMenu.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = mainNav.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Highlight active navigation link on scroll (Debounced) ---
    const updateActiveNavLink = () => {
        let current = '';
        sections.forEach(section => {
            // Adjust offset to trigger active state slightly before section reaches top
            const sectionTop = section.offsetTop - mainNav.offsetHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', debounce(updateActiveNavLink, 50));
    updateActiveNavLink(); // Set initial active link on load

    // --- Mobile Navigation Toggle ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times'); // Change icon on toggle
        });
        // Close menu if clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    }

    // --- Scroll to Top Button ---
    const toggleScrollToTopButton = () => {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    };

    window.addEventListener('scroll', debounce(toggleScrollToTopButton, 100));
    toggleScrollToTopButton(); // Set initial state

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // --- Publications loader from publications.json ---
    const loadPublications = async () => {
        const listContainer = document.getElementById('publications-list');
        if (!listContainer) return;

        try {
            const res = await fetch('publications.json');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();

            if (data.length === 0) {
                listContainer.innerHTML = '<p>No publications to display yet.</p>';
                return;
            }

            const ol = document.createElement('ol');
            data.forEach(pub => {
                const li = document.createElement('li');
                const author = pub.author || 'N/A';
                const year = pub.year ? `(${pub.year})` : '(N/A)';
                const title = pub.title ? `<em>${pub.title}</em>` : 'No Title';
                const journal = pub.journal ? `.${pub.journal}` : '';
                const volume = pub.volume ? `, Vol. ${pub.volume}` : '';
                const pages = pub.pages ? `, pp. ${pub.pages}` : '';
                const doi = pub.doi ? ` <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer" class="pub-link"><i class="fas fa-external-link-alt"></i> DOI</a>` : '';

                li.innerHTML = `<strong>${author}</strong> ${year}. ${title}${journal}${volume}${pages}${doi}`;
                ol.appendChild(li);
            });
            listContainer.appendChild(ol);
        } catch (error) {
            console.error('Error fetching publications:', error);
            listContainer.innerHTML = '<p class="error-message">Failed to load publications. Please check <code>publications.json</code> or your network connection.</p>';
        }
    };
    loadPublications();


    // --- Dynamic Gallery Loader with Lightbox ---
    if (galleryTrack) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        async function fetchGalleryImageNames() {
            // **IMPORTANT: Replace this array with YOUR ACTUAL .JPG (or other image) FILENAMES.**
            // These should be in the same folder as index.html
            const allImagesInFolder = [
                'field1.jpg', 'lab1.png', 'specimen1.jpeg', 'team.jpg', 'plant_sample_1.jpg',
                'microscopy.jpg', 'forest_view.jpg', 'research_group.jpg', 'herbarium_specimen.jpg',
                'data_analysis.jpg', 'field_research_2.jpg', 'lab_bench.jpg', 'plant_closeup.jpg',
                // Add all your other image filenames here
            ];

            const filteredImages = allImagesInFolder.filter(name =>
                imageExtensions.some(ext => name.toLowerCase().endsWith(ext)) &&
                name.toLowerCase() !== 'qrcode.png' &&
                name.toLowerCase() !== 'portrait.jpg' &&
                name.toLowerCase().indexOf('research_') === -1 // Exclude images used in research section
            );
            return filteredImages;
        }

        async function loadGallery() {
            const imgArray = await fetchGalleryImageNames();
            if (imgArray.length === 0) {
                console.log('No eligible images found for the gallery.');
                galleryTrack.parentElement.style.display = 'none';
                return;
            }

            // Create enough duplicates for continuous loop. 3 copies ensure smooth loop across various screen sizes
            const totalCopies = 3;
            let loadedImagesCount = 0;
            let totalImagesToLoad = imgArray.length * totalCopies;

            for (let i = 0; i < totalCopies; i++) {
                imgArray.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = src.split('.')[0].replace(/_/g, ' ');
                    img.loading = 'lazy'; // Improve performance
                    img.dataset.src = src; // Store original src for lightbox
                    galleryTrack.appendChild(img);

                    img.onload = () => {
                        loadedImagesCount++;
                        if (loadedImagesCount === totalImagesToLoad) {
                            // All images loaded, now calculate animation duration
                            const trackWidth = galleryTrack.scrollWidth / totalCopies;
                            const animationDuration = trackWidth / 60; // Adjust 60 for speed (px/s)
                            galleryTrack.style.animationDuration = `${animationDuration}s`;
                        }
                    };
                    img.onerror = () => {
                        console.warn(`Failed to load gallery image: ${img.src}`);
                        img.remove(); // Remove broken image from DOM
                        totalImagesToLoad--; // Adjust total count
                    };
                });
            }
            addLightboxListeners();
        }

        // --- Lightbox/Modal functionality ---
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        const addLightboxListeners = () => {
            const galleryImages = galleryTrack.querySelectorAll('img');
            galleryImages.forEach(image => {
                image.addEventListener('click', e => {
                    lightbox.classList.add('active');
                    const img = document.createElement('img');
                    img.src = e.target.dataset.src; // Use data-src for original image
                    img.alt = e.target.alt;

                    // Clear previous content
                    while (lightbox.firstChild) {
                        lightbox.removeChild(lightbox.firstChild);
                    }
                    lightbox.appendChild(img);
                });
            });

            lightbox.addEventListener('click', e => {
                if (e.target !== e.currentTarget) return; // Only close if clicking on the overlay itself
                lightbox.classList.remove('active');
            });
        };

        loadGallery();
    }


    // --- Intersection Observer for "Reveal on Scroll" Animations ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden-section'); // Add initial hidden class
        observer.observe(section);
    });

    // Also observe research cards for a slight delay effect
    document.querySelectorAll('.research-card').forEach(card => {
        card.classList.add('hidden-card');
        observer.observe(card);
    });

    // And about items
    document.querySelectorAll('.about-item').forEach(item => {
        item.classList.add('hidden-item');
        observer.observe(item);
    });

});
