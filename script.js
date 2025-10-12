/* General Variables */
:root {
    --primary-color: #28a745;
    --secondary-color: #0056b3;
    --text-color: #333;
    --light-text-color: #666;
    --background-light: #f8f9fa;
    --background-dark: #343a40;
    --border-color: #dee2e6;
    --spacing-xs: 5px;
    --spacing-sm: 10px;
    --spacing-md: 20px;
    --spacing-lg: 30px;
    --spacing-xl: 50px;
    --font-sans: 'Montserrat', sans-serif;
    --font-serif: 'Playfair Display', serif;
    --max-width-container: 1200px;
    --header-height-compact: 70px;
}

/* Base Styles */
body {
    font-family: var(--font-sans);
    line-height: 1.6;
    color: var(--text-color);
    margin: 0;
    padding: 0;
    background-color: var(--background-light);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-wrapper {
    flex: 1;
}

.container {
    max-width: var(--max-width-container);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    color: var(--secondary-color);
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}

h1 { font-size: 2.8em; }
h2 { font-size: 2.2em; }
h3 { font-size: 1.8em; }
h4 { font-size: 1.4em; }

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: var(--secondary-color);
    text-decoration: underline;
}

.btn {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border: none;
    cursor: pointer;
    font-size: 1em;
}

.btn:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    text-decoration: none;
}

.btn-primary {
    background-color: var(--primary-color);
}

.btn-primary:hover {
    background-color: #218838;
}

.text-center {
    text-align: center;
}

.section-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.section-title {
    text-align: center;
    margin-bottom: var(--spacing-md);
    color: var(--secondary-color);
}

.section-description {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    color: var(--light-text-color);
}

/* Header Compact */
.main-header-compact {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: var(--spacing-sm) 0;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height-compact);
}

.header-brand {
    font-family: var(--font-serif);
    font-size: 1.5em;
    font-weight: 700;
}

.header-brand a {
    color: var(--primary-color);
    text-decoration: none;
}

.nav-menu-compact {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--spacing-md);
}

.nav-menu-compact li a {
    color: var(--text-color);
    font-weight: 500;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-menu-compact li a:hover,
.nav-menu-compact li a.active {
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
}

.nav-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: var(--text-color);
}

/* Tiny Profile */
.tiny-profile-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-left: auto;
    padding-right: var(--spacing-md);
}

.tiny-profile-wrapper img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--primary-color);
}

.tiny-profile-info {
    display: flex;
    flex-direction: column;
    font-size: 0.85em;
    line-height: 1.2;
    color: var(--light-text-color);
}

.tiny-profile-info strong {
    color: var(--text-color);
    font-weight: 500;
}

/* Hero Section */
.hero-compact {
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('hero-bg.jpg') center center no-repeat;
    background-size: cover;
    color: white;
    text-align: center;
    padding: var(--spacing-xl) var(--spacing-md);
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.hero-text-area {
    max-width: 800px;
    position: relative;
    z-index: 2;
}

.hero-compact h1 {
    font-size: 3.5em;
    margin-bottom: var(--spacing-sm);
    color: white;
}

.hero-tagline {
    font-size: 1.5em;
    font-weight: 300;
    margin-bottom: var(--spacing-md);
}

.hero-mission {
    font-size: 1.1em;
    margin-bottom: var(--spacing-lg);
    opacity: 0.9;
}

.hero-cta .btn {
    font-size: 1.1em;
    padding: var(--spacing-sm) var(--spacing-lg);
}

.dynamic-hero-gallery {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
}

.dynamic-hero-gallery .gallery-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    will-change: opacity, transform; /* Optimize animation performance */
}

@keyframes floatAndFade {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    20% {
        opacity: 0.8;
        transform: translateY(0);
    }
    80% {
        opacity: 0.8;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-20px);
    }
}

/* Main Content with Tabs */
.main-content-tabs {
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);
}

.tab-nav {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
    border-bottom: 2px solid var(--border-color);
    flex-wrap: wrap;
}

.tab-button {
    background-color: transparent;
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
    color: var(--light-text-color);
    transition: color 0.3s ease, border-bottom 0.3s ease;
    white-space: nowrap;
}

.tab-button:hover {
    color: var(--primary-color);
}

.tab-button.active {
    color: var(--primary-color);
    border-bottom: 3px solid var(--primary-color);
    font-weight: 700;
}

.tab-content-wrapper {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    padding: var(--spacing-lg);
}

.tab-pane {
    display: none;
    animation: fadeIn 0.5s ease-out;
}

.tab-pane.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* About the Lab Content - Layout */
.about-lab-content {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-lg);
    align-items: flex-start;
}

.about-lab-text {
    flex: 2;
    min-width: 300px;
}

.about-lab-highlights {
    flex: 1;
    min-width: 200px;
    background-color: var(--background-light);
    border-radius: 8px;
    padding: var(--spacing-md);
    box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
}

.about-lab-highlights h3 {
    margin-top: 0;
    color: var(--primary-color);
    font-size: 1.5em;
}

.about-lab-highlights ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.about-lab-highlights li {
    padding: var(--spacing-xs) 0;
    border-bottom: 1px dotted var(--border-color);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.95em;
    color: var(--text-color);
}

.about-lab-highlights li:last-child {
    border-bottom: none;
}

.about-lab-highlights li i {
    color: var(--primary-color);
    font-size: 1.1em;
    min-width: 20px;
}

/* Compact Contact Section Styles */
.about-lab-contact-mini {
    margin-top: var(--spacing-sm);
    padding-top: var(--spacing-xs);
    border-top: 1px dashed var(--border-color);
}

.about-lab-contact-mini h3 {
    text-align: center;
    margin-bottom: var(--spacing-xs);
    color: var(--secondary-color);
    font-size: 1em;
    font-family: var(--font-sans);
    font-weight: 600;
}

.contact-grid-mini {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--spacing-xs);
    justify-content: center;
}

.contact-item-mini {
    display: flex;
    align-items: flex-start;
    gap: 3px;
    padding: 4px;
    background-color: var(--background-light);
    border-radius: 4px;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
}

.contact-item-mini:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    color: var(--primary-color);
    text-decoration: none;
}

.contact-item-mini i {
    font-size: 0.9em;
    color: var(--primary-color);
    min-width: 18px;
    text-align: center;
    padding-top: 1px;
}

.contact-info-mini h4 {
    margin: 0;
    font-size: 0.75em;
    color: var(--secondary-color);
    font-family: var(--font-sans);
    line-height: 1.2;
}

.contact-info-mini p {
    margin: 0;
    font-size: 0.65em;
    color: var(--light-text-color);
    word-break: break-word;
    line-height: 1.2;
}

.qrcode-item-mini {
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.qrcode-item-mini .qrcode-image-mini {
    width: 45px;
    height: 45px;
    border: 1px solid var(--border-color);
    border-radius: 3px;
    margin-bottom: 2px;
    object-fit: contain;
}

/* Collaboration Areas Tab */
.collaboration-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
}

.collab-item {
    background-color: var(--background-light);
    padding: var(--spacing-lg);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
}

.collab-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.collab-item i {
    font-size: 3em;
    color: var(--primary-color);
    margin-bottom: var(--spacing-sm);
}

.collab-item h3 {
    margin-top: 0;
    color: var(--secondary-color);
}

.collab-item p {
    color: var(--light-text-color);
    font-size: 0.95em;
}

/* Publications List Compact */
.publications-list-compact {
    display: grid;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
}

.publication-item {
    background-color: var(--background-light);
    padding: var(--spacing-md);
    border-radius: 6px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    transition: background-color 0.2s ease;
}

.publication-item:hover {
    background-color: #e9ecef;
}

.publication-item i {
    color: var(--primary-color);
    font-size: 1.2em;
    margin-top: 4px;
    flex-shrink: 0;
}

.publication-info {
    flex-grow: 1;
}

.publication-info h4 {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 1.1em;
    color: var(--secondary-color);
    font-family: var(--font-sans);
    line-height: 1.4;
}

.publication-info p {
    margin: 0;
    font-size: 0.85em;
    color: var(--light-text-color);
    line-height: 1.4;
}

.publication-info a {
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
}

/* Footer */
footer {
    background-color: var(--background-dark);
    color: white;
    text-align: center;
    padding: var(--spacing-md) 0;
    font-size: 0.9em;
    margin-top: var(--spacing-xl);
}

footer a {
    color: var(--primary-color);
}

footer a:hover {
    color: var(--secondary-color);
}

/* Scroll to Top Button */
#scrollToTopBtn {
    display: none;
    position: fixed;
    bottom: var(--spacing-md);
    right: var(--spacing-md);
    z-index: 999;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 1.2em;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;
}

#scrollToTopBtn:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
    .nav-menu-compact {
        display: none;
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: var(--header-height-compact);
        left: 0;
        background-color: #fff;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-menu-compact.active {
        display: flex;
    }

    .nav-menu-compact li {
        text-align: center;
        width: 100%;
    }

    .nav-menu-compact li a {
        display: block;
        padding: var(--spacing-md);
        border-bottom: 1px solid var(--border-color);
    }

    .nav-menu-compact li:last-child a {
        border-bottom: none;
    }

    .nav-toggle {
        display: block;
    }

    .header-container {
        padding: 0 var(--spacing-sm);
    }

    .tiny-profile-wrapper {
        margin-left: 0;
        order: 3;
        padding-right: 0;
    }

    .hero-compact h1 {
        font-size: 2.5em;
    }

    .hero-tagline {
        font-size: 1.2em;
    }

    .main-content-tabs {
        padding: var(--spacing-lg) var(--spacing-sm);
    }

    .tab-button {
        padding: var(--spacing-sm);
        font-size: 1em;
    }

    .about-lab-content {
        flex-direction: column;
        align-items: stretch;
    }

    .about-lab-text,
    .about-lab-highlights {
        min-width: unset;
        width: 100%;
    }

    .contact-grid-mini {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 4px;
    }

    .contact-item-mini {
        padding: 3px;
    }

    .contact-item-mini i {
        font-size: 0.8em;
        min-width: 16px;
    }

    .contact-info-mini h4 {
        font-size: 0.7em;
        line-height: 1.1;
    }

    .contact-info-mini p {
        font-size: 0.6em;
        line-height: 1.1;
    }

    .qrcode-item-mini .qrcode-image-mini {
        width: 40px;
        height: 40px;
    }

    .collab-item {
        padding: var(--spacing-md);
    }

    .collab-item i {
        font-size: 2.5em;
    }

    .collaboration-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .hero-compact {
        padding: var(--spacing-lg) var(--spacing-sm);
        min-height: 300px; /* Reduce height for smaller screens */
    }

    .hero-compact h1 {
        font-size: 2em;
    }

    .hero-tagline {
        font-size: 1em;
    }

    .btn {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: 0.9em;
    }

    .tiny-profile-wrapper {
        display: none;
    }

    .header-brand {
        font-size: 1.3em;
    }
}

@media (max-width: 480px) {
    .header-brand {
        font-size: 1.2em;
    }

    .nav-toggle {
        font-size: 1.3em;
    }

    .tab-nav {
        gap: var(--spacing-xs);
    }

    .tab-button {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: 0.9em;
    }

    .contact-grid-mini {
        grid-template-columns: 1fr;
    }

    .dynamic-hero-gallery .gallery-image {
        object-fit: contain; /* Prevent cropping on very small screens */
    }
}
