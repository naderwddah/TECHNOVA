// Main interactions: mobile menu, scroll reveal, form handling, flip card
document.addEventListener('DOMContentLoaded', function(){

  // Mobile menu toggle (index)
  function wireMobile(buttonId, menuSelector){
    const btn = document.getElementById(buttonId);
    const menu = document.querySelector(menuSelector);
    if(btn && menu){
      btn.addEventListener('click', function(){
        menu.classList.toggle('active');
        // change btn text/icon for simplicity
        this.classList.toggle('active');
      });
    }
  }
  wireMobile('mobileBtn', '#mobileMenu');
  wireMobile('mobileBtn2', '#mobileMenu'); // in case multiple header variants
  wireMobile('mobileBtn3', '#mobileMenu');

  // Scroll reveal for elements
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.grid > article, .card-hover, .animate-on-scroll, .service-card-3d').forEach(el=>{
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      // simulate submit
      if(toast){
        toast.textContent = 'جاري إرسال الطلب...';
        toast.classList.add('show');
      }
      setTimeout(()=>{
        if(toast){
          toast.textContent = 'تم إرسال طلبك بنجاح! سنتواصل معك.';
        }
        contactForm.reset();
        setTimeout(()=> toast.classList.remove('show'), 2800);
      }, 1200);
    });
  }

  // Flip card utility (used in services page)
  window.flipCard = function(el){
    // el is a button inside the card; find the root service-card-3d
    let card = el.closest('.service-card-3d');
    if(!card) card = el.closest('article');
    if(card){
      card.classList.toggle('flipped');
    }
  };

  // small toast element (some pages rely on #toast)
  if(!toast){
    const t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    t.textContent = 'تم إرسال رسالتك بنجاح!';
    document.body.appendChild(t);
  }

  // Lazy image loader: add class loaded when visible (images have lazy-load class)
  const lazyImages = document.querySelectorAll('.lazy-load');
  const imgObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img = entry.target;
        img.classList.add('loaded');
        imgObserver.unobserve(img);
      }
    });
  }, {rootMargin: '0px 0px 200px 0px'});
  lazyImages.forEach(img=> imgObserver.observe(img));

});