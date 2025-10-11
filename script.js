document.addEventListener('DOMContentLoaded', () => {
  // 1. Publications loader from publications.json
  // Assuming publications.json structure: [{author, year, title, journal, volume, pages}]
  fetch('publications.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const list = document.getElementById('publications-list');
      if (list) {
        // Limiting to top 5 for brevity on homepage, adjust as needed
        data.slice(0, 5).forEach(pub => {
          const div = document.createElement('div');
          div.classList.add('publication-item');
          div.innerHTML = `<strong>${pub.author}</strong> (${pub.year}). <em>${pub.title}</em>. ${pub.journal || ''} ${pub.volume || ''} ${pub.pages || ''}`;
          list.appendChild(div);
        });
      }
    })
    .catch(error => console.error('Error loading publications:', error));

  // 2. Dynamic gallery loader
  const galleryTrack = document.getElementById('gallery-track');
  // *** IMPORTANT: Replace these with your actual high-quality images ***
  // These are placeholder names. You NEED to have these files in your repo
  // and they should be distinct, visually appealing images from your work.
  const galleryImages = [
    'gallery_fieldwork1.jpg',
    'gallery_labwork1.jpg',
    'gallery_plant_specimen1.jpg',
    'gallery_microscope1.jpg',
    'gallery_team.jpg',
    'gallery_fieldwork2.jpg',
    'gallery_plant_specimen2.jpg',
    // Add more images here for a richer gallery experience
  ];

  function loadGallery(imgArray) {
    if (!galleryTrack || imgArray.length === 0) return;

    // Duplicate images multiple times for a truly seamless loop effect
    // We duplicate it once, effectively having "original, original"
    // The CSS animation scrolls exactly 50% of this combined length.
    const totalImgs = [...imgArray, ...imgArray];

    totalImgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Research related image"; // Good for accessibility
      galleryTrack.appendChild(img);
    });
  }

  // Load the gallery images
  loadGallery(galleryImages);


  // 3. Intersection Observer for scroll animations (section reveal)
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        // Optional: remove class when out of view if you want repeat animations
        // entry.target.classList.remove('is-visible');
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