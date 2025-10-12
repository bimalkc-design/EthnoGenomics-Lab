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
            document.addEventListener('DOMContentLoaded', () => {
                // ... (other code remains unchanged)
            
                // Dynamic Publications - Updated to retain only DOI link
                const publications = [
                    // ... (publications array remains unchanged)
                ];
            
                const pubList = document.getElementById('publications-list');
                publications.forEach(pub => {
                    const pubItem = document.createElement('div');
                    pubItem.classList.add('pub-item');
                    pubItem.innerHTML = `
                        <h4>${pub.title}</h4>
                        <p>${pub.journal}, ${pub.year}</p>
                        <a href="${pub.doi}" target="_blank" rel="noopener noreferrer">View Publication (DOI)</a>
                    `;
                    pubList.appendChild(pubItem);
                });
            
                // ... (rest of the code remains unchanged)
            });
        });
    });

    // Dynamic Hero Gallery - REVERTED TO ORIGINAL IMAGES + FIXED OFFSET
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
        gallery.children[currentImage + 1].classList.add('active');  // FIXED: +1 skips header
    }, 5000);

    // Dynamic Publications - Updated with provided publications (only DOI link retained)
    const publications = [
        {
            title: '<strong>Chetri, B.K.</strong>, Sonu, S.S., Shelke, R.G. et al. Plastome genomics of the crop wild relative <em>Thladiantha cordifolia</em> illuminates the evolution and phylogeny of the gourd family (Cucurbitaceae)',
            journal: 'Genetic Resources and Crop Evolution, 72: 10441–10456',
            year: 2025,
            doi: 'https://doi.org/10.1007/s10722-025-02579-6',
            googleScholar: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Hp0ZnX4AAAAJ&citation_for_view=Hp0ZnX4AAAAJ:placeholder1'
        },
        {
            title: 'Mohan Singh Rana, Nicolas Dierckxsens, Pritesh Bhatt, <strong>Chetri, B.K.</strong> De novo plastome assembly of <em>Cymbopogon bhutanicus</em> Noltie, an endemic lemon grass from Bhutan, with geospatial, comparative genomic, and phylogenetic insights',
            journal: 'Ec富 Ecological Genetics and Genomics, 36: 100372',
            year: 2025,
            doi: 'https://doi.org/10.1016/j.egg.2025.100372',
            googleScholar: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Hp0ZnX4AAAAJ&citation_for_view=Hp0ZnX4AAAAJ:placeholder2'
        },
        {
            title: '<strong>Chetri, B.K.</strong>, Sonu, S.S., Dierckxsens, N. et al. Insights into cucurbitaceae mitogenomes: gene length variation, correlation features, and phylogenetic relationship',
            journal: 'Journal of Plant Biochemistry and Biotechnology',
            year: 2025,
            doi: 'https://doi.org/10.1007/s13562-025-00992-7',
            googleScholar: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Hp0ZnX4AAAAJ&citation_for_view=Hp0ZnX4AAAAJ:placeholder3'
        },
        {
            title: 'Jintu Rabha, <strong>Chetri, B.K.</ levy Sukanya Das, Dhruva Kumar Jha, In-vitro and in-silico evaluation of antimicrobial and antibiofilm secondary metabolites of a novel fungal endophyte, <em>Albophoma</em> sp. BAPR5',
            journal: 'South African Journal of Botany, 158: 347–368',
            year: 2023,
            doi: 'https://doi.org/10.1016/j.sajb.2023.05.033',
            googleScholar: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Hp0ZnX4AAAAJ&citation_for_view=Hp0ZnX4AAAAJ:placeholder4'
        }
    ];

    const pubList = document.getElementById('publications-list');
    publications.forEach(pub => {
        const pubItem = document.createElement('div');
        pubItem.classList.add('pub-item');
        pubItem.innerHTML = `
            <h4>${pub.title}</h4>
            <p>${pub.journal}, ${pub.year}</p>
            <a href="${pub.doi}" target="_blank" rel="noopener noreferrer">View Publication (DOI)</a>
        `;
        pubList.appendChild(pubItem);
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
    document.getElementById('current-year').text環境Content = new Date().getFullFullYear();
});
