document.addEventListener('DOMContentLoaded', () => {
  // Publications loader from publications.json
  fetch('publications.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const list = document.getElementById('publications-list');
      data.forEach(pub => {
        const div = document.createElement('div');
        div.classList.add('publication-item');
        let pubContent = `<strong>${pub.author}</strong> (${pub.year}). <em>${pub.title}</em>. `;
        if (pub.journal) pubContent += `${pub.journal}. `;
        if (pub.volume) pubContent += `Vol ${pub.volume}. `;
        if (pub.pages) pubContent += `pp. ${pub.pages}.`;
        if (pub.doi) pubContent += `<br><a href="https://doi.org/${pub.doi}" target="_blank">DOI: ${pub.doi}</a>`;

        div.innerHTML = pubContent;
        list.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      document.getElementById('publications-list').innerHTML = '<p>Error loading publications. Please try again later.</p>';
    });

  // Gallery Image Loader
  // IMPORTANT: List your actual image filenames here as they are in your root directory.
  const imageFilenames = [
    '2.10.jpg',
    '3.5a.jpg',
    '3.5b.jpg',
    '3.6.jpg',
    '4.2.jpg',
    '4.4.jpg',
    '5.0.jpg',
    '5.2.jpg',
    'pp.jpg' // You also have pp.jpg, assuming it's part of the gallery
    // Add any other gallery-intended images here
  ];

  // Since your images are in the root, the galleryPath is just an empty string
  const galleryPath = ''; // Images are in the root directory

  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    if (imageFilenames.length > 0) {
      imageFilenames.forEach(filename => {
        const imgPath = galleryPath + filename; // This will just be the filename
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = filename.split('.')[0].replace(/_/g, ' '); // Basic alt text
        img.loading = 'lazy'; // Improve performance

        div.appendChild(img);
        galleryGrid.appendChild(div);
      });
    } else {
      galleryGrid.innerHTML = '<p>No images found in the gallery. Please add image filenames to `imageFilenames` array in `script.js`.</p>';
    }
  }


  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the section is visible
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
