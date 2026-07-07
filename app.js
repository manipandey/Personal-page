document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // SCROLL-DRIVEN ANIMATION FALLBACKS
  // ==========================================
  
  // 1. Shrinking Header Fallback
  const header = document.querySelector('header');
  const scrollDistance = 80;
  
  // Check for native CSS scroll timeline support
  const supportsScrollTimeline = CSS.supports && CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');
  
  if (!supportsScrollTimeline) {
    const handleScroll = () => {
      if (window.scrollY > scrollDistance) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially in case of refresh
  }
  
  // 2. Section Scroll Reveal Fallback
  const supportsViewTimeline = CSS.supports && CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (!supportsViewTimeline) {
    // Apply fallback classes
    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll-fallback');
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.12, // Trigger when 12% is visible
      rootMargin: '0px 0px -50px 0px' // Margins to make reveal smoother
    });
    
    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }
  
  // ==========================================
  // PORTFOLIO FILTER SYSTEM
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const tradingSubGrid = document.querySelector('.trading-sub-grid');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'grid';
          // Force a slight delay to trigger entry effect transitions
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      // Handle the automated systems grid specifically
      if (tradingSubGrid) {
        if (filterValue === 'trading' || filterValue === 'all') {
          tradingSubGrid.style.display = 'grid';
          setTimeout(() => {
            tradingSubGrid.style.opacity = '1';
          }, 50);
        } else {
          tradingSubGrid.style.opacity = '0';
          setTimeout(() => {
            tradingSubGrid.style.display = 'none';
          }, 300);
        }
      }
    });
  });
  
  // ==========================================
  // DYNAMIC CONTACT FORM HANDLER
  // ==========================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="icon">⌛</span> Sending Message...';
      
      setTimeout(() => {
        // Success state
        submitBtn.style.background = 'var(--color-emerald)';
        submitBtn.style.color = '#fff';
        submitBtn.innerHTML = '<span class="icon">✓</span> Message Sent!';
        
        // Reset form
        contactForm.reset();
        
        // Reset button state
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.innerHTML = originalText;
        }, 3000);
      }, 1500);
    });
  }
  
  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        mobileToggle.innerHTML = '✕';
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '90px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = 'rgba(10, 11, 16, 0.95)';
        navLinksContainer.style.backdropFilter = 'blur(15px)';
        navLinksContainer.style.padding = '30px';
        navLinksContainer.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        navLinksContainer.style.gap = '20px';
        navLinksContainer.style.alignItems = 'center';
      } else {
        mobileToggle.innerHTML = '☰';
        navLinksContainer.style.display = '';
      }
    });
  }
});
