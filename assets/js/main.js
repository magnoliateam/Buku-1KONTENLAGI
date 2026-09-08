/**
 * BUKU 1 KONTEN LAGI - MAIN JAVASCRIPT
 * Interactive functionality & UI controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = (open) => {
      if (open) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (closeMobileMenu) {
      closeMobileMenu.addEventListener('click', () => toggleMenu(false));
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: close other accordions
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Chapter Tabs Switcher
  const chapterButtons = document.querySelectorAll('.chapter-tab-btn');
  const chapterPanels = document.querySelectorAll('.chapter-content-panel');

  chapterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-chapter');

      chapterButtons.forEach(b => {
        b.classList.remove('border-blood-bright', 'bg-[#2a1a17]', 'text-white');
        b.classList.add('border-hairline', 'bg-ink-raised', 'text-muted');
      });

      btn.classList.remove('border-hairline', 'bg-ink-raised', 'text-muted');
      btn.classList.add('border-blood-bright', 'bg-[#2a1a17]', 'text-white');

      chapterPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // 4. Countdown Timer
  const hoursElem = document.getElementById('timerHours');
  const minutesElem = document.getElementById('timerMinutes');
  const secondsElem = document.getElementById('timerSeconds');

  if (hoursElem && minutesElem && secondsElem) {
    // 6 hours promo countdown saved in sessionStorage or fresh
    let totalSeconds = 6 * 3600 + 42 * 60 + 19;

    const updateTimer = () => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursElem.textContent = String(h).padStart(2, '0');
      minutesElem.textContent = String(m).padStart(2, '0');
      secondsElem.textContent = String(s).padStart(2, '0');

      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        totalSeconds = 6 * 3600; // loop reset
      }
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // 5. Sticky Mobile Bottom CTA
  const stickyMobileBar = document.getElementById('stickyMobileCta');
  const heroSection = document.getElementById('hero');

  if (stickyMobileBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyMobileBar.classList.add('visible');
      } else {
        stickyMobileBar.classList.remove('visible');
      }
    });
  }

  // 6. Smooth Scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Dynamic Stock Indicator
  const stockCountElem = document.getElementById('stockCount');
  if (stockCountElem) {
    let stock = 47;
    setInterval(() => {
      if (Math.random() > 0.65 && stock > 12) {
        stock -= 1;
        stockCountElem.textContent = stock;
      }
    }, 45000);
  }

  // 8. Order Button Tracking / Toast feedback
  const orderButtons = document.querySelectorAll('.order-btn-action');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-plan') || 'Buku 1 Konten Lagi';
      console.log('Order clicked for:', planName);
    });
  });
});
