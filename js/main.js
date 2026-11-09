/* ==========================================================================
   IRONCORE FITNESS - CORE JAVASCRIPT
   Handles Navbar, Mobile Drawer, Counters, Modals, Toasts, Billing, and FAQs
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initStatsCounter();
  initBackToTop();
  initModals();
  initBillingToggle();
  initFAQ();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !overlay) return;

  const openDrawer = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeDrawer();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. ANIMATED STATISTICS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-counter');
  if (!statElements.length) return;

  let hasAnimated = false;

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(target * (1 - (1 - progress) * (1 - progress)));
      
      el.textContent = current.toLocaleString() + suffix;

      if (frame >= totalFrames) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(counter);
      }
    }, frameRate);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => animateCount(el));
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   4. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   5. JOIN NOW / ENQUIRY MODAL SYSTEM
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('joinModal');
  const closeBtns = document.querySelectorAll('.modal-close, .modal-cancel');
  const openBtns = document.querySelectorAll('[data-open-modal="joinModal"]');

  if (!modalOverlay) return;

  window.openJoinModal = (planName = 'Premium', programName = '') => {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Pre-select plan if passed
    const planSelect = document.getElementById('modalPlan');
    if (planSelect && planName) {
      const match = Array.from(planSelect.options).find(opt => 
        opt.value.toLowerCase() === planName.toLowerCase() || 
        opt.text.toLowerCase().includes(planName.toLowerCase())
      );
      if (match) planSelect.value = match.value;
    }

    // Pre-select program if passed
    const programSelect = document.getElementById('modalProgram');
    if (programSelect && programName) {
      const match = Array.from(programSelect.options).find(opt => 
        opt.value.toLowerCase() === programName.toLowerCase() || 
        opt.text.toLowerCase().includes(programName.toLowerCase())
      );
      if (match) programSelect.value = match.value;
    }
  };

  window.closeJoinModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'Premium';
      const program = btn.getAttribute('data-program') || '';
      window.openJoinModal(plan, program);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', window.closeJoinModal);
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      window.closeJoinModal();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      window.closeJoinModal();
    }
  });
}

/* ==========================================================================
   6. GLOBAL TOAST NOTIFICATION SYSTEM
   ========================================================================== */
window.showToast = (message, type = 'success') => {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconHtml = '<i class="fa-solid fa-circle-check toast-icon"></i>';
  if (type === 'error') {
    iconHtml = '<i class="fa-solid fa-circle-exclamation toast-icon" style="color: #EF4444;"></i>';
  } else if (type === 'info') {
    iconHtml = '<i class="fa-solid fa-circle-info toast-icon"></i>';
  }

  toast.innerHTML = `
    ${iconHtml}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
};

/* ==========================================================================
   7. BILLING TOGGLE (MONTHLY VS ANNUAL)
   ========================================================================== */
function initBillingToggle() {
  const toggleInput = document.getElementById('billingToggle');
  if (!toggleInput) return;

  const priceElements = document.querySelectorAll('.pricing-amount[data-monthly]');
  const durationElements = document.querySelectorAll('.pricing-duration');

  toggleInput.addEventListener('change', () => {
    const isAnnual = toggleInput.checked;

    priceElements.forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const annual = el.getAttribute('data-annual');
      el.textContent = isAnnual ? annual : monthly;
    });

    durationElements.forEach(el => {
      el.textContent = isAnnual ? 'Per Month (Billed Annually)' : 'Monthly';
    });

    window.showToast(isAnnual ? '20% Annual Discount Applied! 🎁' : 'Switched to Monthly Billing', 'info');
  });
}

/* ==========================================================================
   8. FAQ ACCORDION COMPONENT
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const icon = other.querySelector('.faq-icon');
        if (icon) icon.className = 'fa-solid fa-plus faq-icon';
      });

      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.className = 'fa-solid fa-minus faq-icon';
      }
    });
  });
}
