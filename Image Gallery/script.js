let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Open Lightbox
function openLightbox(src) {
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
  currentImageIndex = Array.from(images).findIndex(img => img.src === src);
}

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Navigate images
function navigate(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  lightboxImg.src = images[currentImageIndex].src;
}

// Filter Images
function filterImages(category) {
  const imageDivs = document.querySelectorAll('.image');
  imageDivs.forEach(div => {
    if (category === 'all' || div.classList.contains(category)) {
      div.style.display = 'block';
    } else {
      div.style.display = 'none';
    }
  });
}
