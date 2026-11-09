/* ==========================================================================
   IRONCORE FITNESS - FORMS & VALIDATION JAVASCRIPT
   Handles Contact Form, Join Modal Form, Newsletter, and WhatsApp Redirection
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initJoinModalForm();
  initNewsletterForm();
  initWhatsAppDirect();
});

/* ==========================================================================
   1. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const message = form.querySelector('[name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    let isValid = true;

    // Reset errors
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    if (!name.value.trim()) {
      name.classList.add('input-error');
      isValid = false;
    }
    if (!email.value.trim() || !validateEmail(email.value)) {
      email.classList.add('input-error');
      isValid = false;
    }
    if (!phone.value.trim() || phone.value.length < 8) {
      phone.classList.add('input-error');
      isValid = false;
    }
    if (!message.value.trim()) {
      message.classList.add('input-error');
      isValid = false;
    }

    if (!isValid) {
      window.showToast('Please fill out all required fields correctly.', 'error');
      return;
    }

    // Loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Enquiry...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Save enquiry to localStorage mock database
      const enquiries = JSON.parse(localStorage.getItem('ironcore_enquiries') || '[]');
      enquiries.push({
        id: 'IC-' + Math.floor(100000 + Math.random() * 900000),
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        message: message.value.trim(),
        date: new Date().toISOString()
      });
      localStorage.setItem('ironcore_enquiries', JSON.stringify(enquiries));

      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      window.showToast('Thank you! Your message has been sent. Our team will contact you shortly.', 'success');
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* ==========================================================================
   2. JOIN NOW MODAL FORM HANDLER
   ========================================================================== */
function initJoinModalForm() {
  const form = document.getElementById('joinForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="modalName"]');
    const email = form.querySelector('[name="modalEmail"]');
    const phone = form.querySelector('[name="modalPhone"]');
    const plan = form.querySelector('[name="modalPlan"]');
    const program = form.querySelector('[name="modalProgram"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    let isValid = true;
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    if (!name.value.trim()) {
      name.classList.add('input-error');
      isValid = false;
    }
    if (!email.value.trim() || !validateEmail(email.value)) {
      email.classList.add('input-error');
      isValid = false;
    }
    if (!phone.value.trim() || phone.value.length < 8) {
      phone.classList.add('input-error');
      isValid = false;
    }

    if (!isValid) {
      window.showToast('Please provide your name, valid email, and contact number.', 'error');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Registration...';
    submitBtn.disabled = true;

    setTimeout(() => {
      const refNumber = 'IRON-' + Math.floor(100000 + Math.random() * 900000);
      
      // Save member registration
      const members = JSON.parse(localStorage.getItem('ironcore_memberships') || '[]');
      members.push({
        refNumber,
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        plan: plan.value,
        program: program ? program.value : 'General Fitness',
        date: new Date().toISOString()
      });
      localStorage.setItem('ironcore_memberships', JSON.stringify(members));

      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Welcome to IRONCORE!';
      
      window.showToast(`Welcome! Registration received for ${plan.value} Plan. Ref: ${refNumber}`, 'success');

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        if (window.closeJoinModal) {
          window.closeJoinModal();
        }
      }, 2000);
    }, 1200);
  });
}

/* ==========================================================================
   3. FOOTER NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input || !validateEmail(input.value)) {
      window.showToast('Please enter a valid email address.', 'error');
      return;
    }

    window.showToast('Subscribed! Get ready for exclusive workout tips & gym passes.', 'success');
    input.value = '';
  });
}

/* ==========================================================================
   4. DIRECT WHATSAPP INTEGRATION
   ========================================================================== */
function initWhatsAppDirect() {
  const waButtons = document.querySelectorAll('.whatsapp-trigger, .floating-whatsapp');
  const gymPhone = "919876543210"; // Official Ironcore Gym WhatsApp Contact

  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-wa-plan') || '';
      let message = "Hello Ironcore Fitness! I'm interested in joining your gym.";
      if (plan) {
        message = `Hello Ironcore Fitness! I'd like more details regarding the ${plan} membership plan and scheduling a gym tour.`;
      }
      const waUrl = `https://api.whatsapp.com/send?phone=${gymPhone}&text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  });
}

/* Helper Email Validator */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
