/* ==========================================================================
   IRONCORE FITNESS - GALLERY, LIGHTBOX & FILTERING JAVASCRIPT
   Handles category filtering, full-screen lightbox, keyboard navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initProgramFilter();
});

/* ==========================================================================
   1. GALLERY PAGE FILTERING & LIGHTBOX
   ========================================================================== */
function initGallery() {
  const galleryGrid = document.querySelector('.gallery-grid');
  const lightbox = document.getElementById('lightboxModal');
  if (!galleryGrid || !lightbox) return;

  const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
  const galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Lightbox Functionality
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const visibleItems = () => galleryItems.filter(item => item.style.display !== 'none');

  const showLightboxImage = (index) => {
    const items = visibleItems();
    if (!items.length) return;

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;

    const currentItem = items[currentIndex];
    const imgEl = currentItem.querySelector('img');
    const titleEl = currentItem.querySelector('.gallery-item-title');
    const categoryEl = currentItem.querySelector('.gallery-item-category');

    const src = currentItem.getAttribute('data-full') || imgEl.getAttribute('src');
    const title = titleEl ? titleEl.textContent : 'Ironcore Fitness Arena';
    const category = categoryEl ? categoryEl.textContent : '';

    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxCaption.innerHTML = `<span>${title}</span> <small style="display:block; color: #FF5A1F; font-size: 0.85rem; margin-top: 4px;">${category} (${currentIndex + 1} of ${items.length})</small>`;
  };

  const openLightbox = (index) => {
    showLightboxImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const items = visibleItems();
      const index = items.indexOf(item);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentIndex + 1);
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentIndex + 1);
  });
}

/* ==========================================================================
   2. PROGRAMS PAGE CATEGORY FILTER
   ========================================================================== */
function initProgramFilter() {
  const filterContainer = document.getElementById('programFilter');
  if (!filterContainer) return;

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.program-detail-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}
