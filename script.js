// Gallery Images
const galleryImages = [
  '2.10.jpg', '3.5a.jpg', '3.5b.jpg', '3.6.jpg', '4.2.jpg', '4.4.jpg', '5.0.jpg', '5.2.jpg'
];

const galleryGrid = document.getElementById('gallery-grid');
galleryImages.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = src.split('.')[0];
  galleryGrid.appendChild(img);
});

// Load Publications from JSON
fetch('publications.json')
  .then(res => res.json())
  .then(data => {
    const pubContainer = document.getElementById('publications-list');
    data.forEach(pub => {
      const div = document.createElement('div');
      div.className = 'publication-item';
      div.innerHTML = `<strong>${pub.title}</strong> <em>${pub.journal}</em>, ${pub.year}`;
      pubContainer.appendChild(div);
    });
  })
  .catch(err => console.error('Error loading publications:', err));

// Smooth Scroll
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
