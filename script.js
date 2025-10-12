document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu-compact');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Dynamic Hero Gallery
    const gallery = document.querySelector('.dynamic-hero-gallery');
    const images = [
        '2.10.jpg',
        '3.5a.jpg',
        '3.5b.jpg',
        '3.6.jpg',
        '4.2.jpg',
        '4.4.jpg',
        '5.0.jpg',
        '5.2.jpg',
        'Update_1.jpg',
        'Update_2.jpg',
        'Update_3.jpg',
        'Update_4.jpg',
        'research_genomics.jpg'
    ];
    let currentImage = 0;

    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('hero-gallery-image');
        if (index === 0) img.classList.add('active');
        gallery.appendChild(img);
    });

    setInterval(() => {
        const current = gallery.querySelector('.hero-gallery-image.active');
        current.classList.remove('active');
        currentImage = (currentImage + 1) % images.length;
        gallery.children[currentImage + 1].classList.add('active'); // Offset by 1 due to header
    }, 5000);

    // Dynamic Publications from publications.json
    fetch('publications.json')
        .then(response => response.json())
        .then(publications => {
            const pubList = document.getElementById('publications-list');
            publications.forEach(pub => {
                const pubItem = document.createElement('div');
                pubItem.classList.add('pub-item');
                pubItem.innerHTML = `
                    <h4>${pub.title}</h4>
                    <p>${pub.journal}, ${pub.year}</p>
                    <a href="${pub.doi}" target="_blank" rel="noopener noreferrer">View Publication</a>
                `;
                pubList.appendChild(pubItem);
            });
        })
        .catch(error => {
            console.error('Error loading publications:', error);
            const pubList = document.getElementById('publications-list');
            pubList.innerHTML = '<p>Unable to load publications at this time.</p>';
        });

    // Dynamic LinkedIn Contact Item
    const contactGrid = document.querySelector('.contact-grid-mini');
    const linkedinItem = document.createElement('a');
    linkedinItem.href = 'https://www.linkedin.com/in/bimal-chetri';
    linkedinItem.target = '_blank';
    linkedinItem.rel = 'noopener noreferrer';
    linkedinItem.classList.add('contact-item-mini');
    linkedinItem.innerHTML = `
        <i class="fab fa-linkedin"></i>
        <div class="contact-info-mini">
            <h4>LinkedIn</h4>
            <p>View Profile</p>
        </div>
    `;
    contactGrid.appendChild(linkedinItem);

    // Scroll to Top Button
    const scrollBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
